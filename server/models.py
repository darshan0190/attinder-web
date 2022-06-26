from werkzeug.security import generate_password_hash, check_password_hash
from app import db


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)

    username = db.Column(db.String(64), index=True, unique=True)
    fullname = db.Column(db.String(100), index=True, unique=False)
    email = db.Column(db.String(120), index=True, unique=True)
    login_counts = db.Column(db.Integer,default=0)
    password_hash = db.Column(db.String(128))

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    def get_json_data(self):
        return {
            "username": self.username,
            "fullname": self.fullname,
            "email": self.email,
            "login_counts" : self.login_counts,
        }

class Subject(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    semester = db.Column(db.Integer,index=True, unique=False)
    subjectname = db.Column(db.String(250), index=True)
    subjectcode = db.Column(db.String(250), index=True)
    def get_json_data(self):
        return {
            "id": self.id,
            "semester" : self.semester,
            "subjectname": self.subjectname,
            "subjectcode": self.subjectcode,
        }

class Student(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.Integer,index=True, unique=False)
    def get_json_data(self):
        return {
            "id": self.id,
            "name" : self.name,
        }    

class StudentSubject(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    studentid = db.Column(db.Integer, db.ForeignKey('student.id'))
    subjectid = db.Column(db.Integer, db.ForeignKey('subject.id'))
    def get_json_data(self):
        return {
            "id": self.id,
            "studentid" : self.studentid,
            "subjectid": self.subjectid,
        }




# class Actor(Base):
#     __tablename__ = 'actors'

#     id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
#     name = Column(String)
#     nickname = Column(String)
#     academy_awards = Column(Integer)

# class Movie(Base):
#     __tablename__ = 'movies'

#     id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
#     title = Column(String)

#     actors = relationship('ActorMovie', uselist=True, backref='movies')

# class ActorMovie(Base):
#     __tablename__ = 'actor_movies'

#     actor_id = Column(UUID(as_uuid=True), ForeignKey('actors.id'))
#     movie_id = Column(UUID(as_uuid=True), ForeignKey('movies.id'))