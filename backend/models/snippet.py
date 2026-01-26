from extensions import db
from datetime import datetime, UTC, timezone

def utcnow():
    return datetime.now(timezone.utc)

class Snippet(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    title = db.Column(db.String(100))
    code = db.Column(db.Text)
    language = db.Column(db.String(50))
    description = db.Column(db.String(255))
    created_at = db.Column(db.DateTime, default=utcnow)

    def __repr__(self):
        return f"Snippet {self.title}"