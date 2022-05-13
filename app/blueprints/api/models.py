from app import db
from datetime import datetime as dt

class Category(db.Model):
    id=db.Column(db.Integer, primary_key=True)
    name=db.Column(db.String)
    products = db.relationship('Item', backref="cat", 
                lazy="dynamic", cascade="all, delete-orphan")
    
    def __repr__(self):
        return f'<Category: {self.id}|{self.name}>'

    def save(self):
        db.session.add(self)
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()
    
    def to_dict(self):
        return {
            "id":self.id,
            "name":self.name
        }

class Item(db.Model):
    id=db.Column(db.Integer, primary_key=True)
    name=db.Column(db.String)
    desc = db.Column(db.Text)
    price = db.Column(db.Float)
    img=db.Column(db.String)
    created_on=db.Column(db.DateTime, index=True, default=dt.utcnow)
    category_id=db.Column(db.ForeignKey('category.id'))
    
    def __repr__(self):
        return f'<Item: {self.id}|{self.name}>'

    def save(self):
        db.session.add(self)
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    def to_dict(self):
        return {
            'id':self.id,
            'name':self.name,
            'desc':self.desc,
            'price':self.price,
            'img':self.img,
            'created_on':self.created_on,
            'category_id':self.category_id
        }

    def from_dict(self, data):
        for field in ['name','desc','price','img','category_id']:
            if field in data:
                    #the object, the attribute, value
                setattr(self, field, data[field])
    
    