#
# Simple public logging module
#

from os import environ, path, remove
from flask import Blueprint, render_template, request, session, jsonify, redirect
from xaiecon.modules.core.cache import cache

from xaiecon.classes.base import open_db
from xaiecon.classes.log import Log
from xaiecon.classes.exception import XaieconException

from xaiecon.modules.core.wrappers import login_wanted, login_required

log = Blueprint('log',__name__,template_folder='templates/log')

@log.route('/log/public', methods = ['GET'])
@login_wanted
def showlogs(u=None):
	try:
		db = open_db()
		
		logs = db.query(Log).all()
		if logs == None:
			raise XaieconException('No logs.')
		
		res = render_template('/logs/loglist.html',u=u,title = 'Public logs', logs = logs, len = len(logs))
		db.close()
		
		return res
	except XaieconException as e:
		return render_template('/logs/loglist.html',u=u,title = 'Public logs')

print('Logging system ... ok')