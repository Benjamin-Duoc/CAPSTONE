from .. import db

class GenericService:
    def __init__(self, model):
        self.model = model

    def get_all(self):
        return self.model.query.all()

    def get_by_id(self, id):
        return self.model.query.get(id)

    def save(self, data_dict):
        # Handling the case where ID might be provided (update) or not (create)
        item_id = data_dict.get('id')
        if item_id:
            item = self.model.query.get(item_id)
            if item:
                for key, value in data_dict.items():
                    setattr(item, key, value)
            else:
                item = self.model(**data_dict)
                db.session.add(item)
        else:
            item = self.model(**data_dict)
            db.session.add(item)
        
        db.session.commit()
        return item

    def delete(self, id):
        item = self.model.query.get(id)
        if item:
            db.session.delete(item)
            db.session.commit()
            return True
        return False
