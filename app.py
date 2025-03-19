from fastapi import FastAPI, HTTPException

app = FastAPI()

products = {
    1: {"name": "Window"}
}

boms = {
    1: [
        {"component": "Glass", "quantity": 2, "level": 1},
        {"component": "Frame", "quantity": 2, "level": 1},
        {"component": "Screws", "quantity": 4, "level": 1},
        {"component": "Sealant", "quantity": 3, "level": 1}
    ],
    2: [
        {"component": "Wood", "quantity": 4, "level": 2},
        {"component": "Metal Brackets", "quantity": 4, "level": 2}
    ]
}

@app.get("/mrp/{product_id}")
def calculate_mrp(product_id: int, production_amount: int):
    if product_id not in products:
        raise HTTPException(status_code=404, detail="Product not found")
    if product_id not in boms:
        raise HTTPException(status_code=404, detail="BOM not found for this product")
    
    mrp = {}
    for bom in boms[product_id]:
        component = bom["component"]
        quantity = bom["quantity"] * production_amount
        mrp[component] = quantity
        
        # Check for sub-components
        sub_product_id = next((pid for pid, p in products.items() if p["name"] == component), None)
        if sub_product_id and sub_product_id in boms:
            for sub_bom in boms[sub_product_id]:
                sub_component = sub_bom["component"]
                sub_quantity = sub_bom["quantity"] * quantity
                if sub_component in mrp:
                    mrp[sub_component] += sub_quantity
                else:
                    mrp[sub_component] = sub_quantity
    
    return mrp

# http://127.0.0.1:8000/mrp/1?production_amount=10