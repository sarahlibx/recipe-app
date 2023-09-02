import time
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///recipes.db'  # You can use another database if you prefer
db = SQLAlchemy(app)


class Recipe(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    ingredients = db.Column(db.String(500), nullable=False)
    instructions = db.Column(db.Text, nullable=False)
    servings = db.Column(db.Integer, nullable=False)

    def __repr__(self):
        return f"Recipe(id={self.id}, title='{self.title}', servings={self.servings})"

# with app.app_context():
#   db.create_all()
#   db.session.commit()
# Will return a JSON payload like: {"time": 1589144576.033372}

@app.route('/whoisthegreatest')
def get_greatest():
    return {'name': 'Ann Cascarano'}

@app.route('/api/recipes', methods=['GET'])
def get_all_recipes():
    recipes = Recipe.query.all()
    recipe_list = []
    for recipe in recipes:
        recipe_list.append({
            'id': recipe.id,
            'title': recipe.title,
            'ingredients': recipe.ingredients,
            'instructions': recipe.instructions,
            'servings': recipe.servings
        })
    return jsonify(recipe_list)

# Route to add a new recipe
@app.route('/api/recipes', methods=['POST'])
def add_recipe():
    data = request.get_json()
    new_recipe = Recipe(
        title=data['title'],
        ingredients=data['ingredients'],
        instructions=data['instructions'],
        servings=data['servings']
    )
    db.session.add(new_recipe)
    db.session.commit()
    return jsonify({'message': 'Recipe added successfully'})

# Route to update a recipe
@app.route('/api/recipes/<int:recipe_id>', methods=['PUT'])
def update_recipe(recipe_id):
    recipe = Recipe.query.get(recipe_id)
    if not recipe:
        return jsonify({'error': 'Recipe not found'}), 404

    data = request.get_json()
    recipe.title = data['title']
    recipe.ingredients = data['ingredients']
    recipe.instructions = data['instructions']
    recipe.servings = data['servings']

    db.session.commit()
    return jsonify({'message': 'Recipe updated successfully'})

# Route to delete a recipe
@app.route('/api/recipes/<int:recipe_id>', methods=['DELETE'])
def delete_recipe(recipe_id):
    recipe = Recipe.query.get(recipe_id)
    if not recipe:
        return jsonify({'error': 'Recipe not found'}), 404

    db.session.delete(recipe)
    db.session.commit()
    return jsonify({'message': 'Recipe deleted successfully'})

# if __name__ == '__main__':
#     app.run(debug=True)