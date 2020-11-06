import datetime
from sqlalchemy import *
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relation, sessionmaker, relationship
from xaiecon.classes.base import Base

class Category(Base):
	__tablename__ = 'xaiecon_categories'
	
	id = Column(Integer, primary_key=True)
	name = Column(String(4095), nullable=False)
	creation_date = Column(DateTime, default=datetime.datetime.utcnow)
	
	def __init__(self, **kwargs):
		super(Category, self).__init__(**kwargs)
	
	def __repr__(self):
		return 'Category(%r,%r)' % (self.name,self.creation_date)

CREATE TABLE xaiecon_oauth_app(
	id SERIAL PRIMARY KEY,
	client_id VARCHAR(128) NOT NULL,
	client_secret VARCHAR(128) NOT NULL,
	app_name VARCHAR(128),
	user_id INT REFERENCES xaiecon_users(id)
);
