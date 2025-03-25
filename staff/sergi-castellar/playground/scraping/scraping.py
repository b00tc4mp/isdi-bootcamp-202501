from requests_html import HTMLSession

s = HTMLSession()
r = s.get('http://www.clubdelbarman-abecat.com/es/listado-cocteles/')
cocktails = r.html.find('p', first=True)
print cocktails