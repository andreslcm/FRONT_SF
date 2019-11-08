from selenium import webdriver
from selenium.webdriver.common.keys import Keys
import time

driver = webdriver.Chrome()
driver.get("http://localhost:8080/login")


if "login.html" in driver.title:
  print("Funciona")
else:
  print("No funciona")


elem = driver.find_element_by_name("nombreUsuario")
elem.send_keys("Rocarp")
elem = driver.find_element_by_name("contraseña")
elem.send_keys("123")

driver.find_element_by_class_name('boton-enviar').click()


time.sleep(2)

driver.find_element_by_class_name('boton-4').click()

element = driver.find_element_by_name("nombreUsuario")
value = element.get_attribute("value")
if value == "Rocio":
	print("el nombre esta bien")
else:
	print("el nombre no esta bien")
	driver.find_element_by_name("nombreUsuario").clear()
	driver.find_element_by_name("nombreUsuario").send_keys("Rocio")




element = driver.find_element_by_name("apellidoCliente")
value = element.get_attribute("value")
if value == "Rodriguez":
	print("el nombre esta bien")
else:
	print("el nombre esta mal")
	driver.find_element_by_name("apellidoCliente").clear()
	driver.find_element_by_name("apellidoCliente").send_keys("Rodriguez")

element = driver.find_element_by_name("apellidoCliente")
value = element.get_attribute("value")
if value == "Rodriguez":
	print("el nombre esta bien")
else:
	print("el nombre esta mal")
	driver.find_element_by_name("apellidoCliente").clear()
	driver.find_element_by_name("apellidoCliente").send_keys("Rodriguez")


element = driver.find_element_by_name("nombreUsuario")
value = element.get_attribute("value")
if value == "Rocarp":
	print("el nombre esta bien")
else:
	print("el nombre esta mal")
	driver.find_element_by_name("nombreUsuario").clear()
	driver.find_element_by_name("nombreUsuario").send_keys("Rocarp")


element = driver.find_element_by_name("contrasena")
value = element.get_attribute("value")
if value == "Rodriguez":
	print("el nombre esta bien")
else:
	print("el nombre esta mal")
	driver.find_element_by_name("contrasena").clear()
	driver.find_element_by_name("contrasena").send_keys("123")


element = driver.find_element_by_name("contrasena")
value = element.get_attribute("value")
if value == "Rodriguez":
	print("el nombre esta bien")
else:
	print("el nombre esta mal")
	driver.find_element_by_name("contrasena").clear()
	driver.find_element_by_name("contrasena").send_keys("123")


element = driver.find_element_by_name("ciudad")
value = element.get_attribute("value")
if value == "capital federal":
	print("el nombre esta bien")
else:
	print("el nombre esta mal")
	driver.find_element_by_name("ciudad").clear()
	driver.find_element_by_name("ciudad").send_keys("capital federal")

element = driver.find_element_by_name("estado")
value = element.get_attribute("value")
if value == "Belgrano":
	print("el nombre esta bien")
else:
	print("el nombre esta mal")
	driver.find_element_by_name("estado").clear()
	driver.find_element_by_name("estado").send_keys("Belgrano")


element = driver.find_element_by_name("pais")
value = element.get_attribute("value")
if value == "Argentina":
	print("el nombre esta bien")
else:
	print("el nombre esta mal")
	driver.find_element_by_name("pais").clear()
	driver.find_element_by_name("pais").send_keys("Argentina")


	element = driver.find_element_by_name("direccion")
value = element.get_attribute("value")
if value == "calle falsa 123":
	print("el nombre esta bien")
else:
	print("el nombre esta mal")
	driver.find_element_by_name("direccion").clear()
	driver.find_element_by_name("direccion").send_keys("calle falsa 123")

	element = driver.find_element_by_name("codigoPostal")
value = element.get_attribute("value")
if value == "1426":
	print("el nombre esta bien")
else:
	print("el nombre esta mal")
	driver.find_element_by_name("codigoPostal").clear()
	driver.find_element_by_name("codigoPostal").send_keys("1426")

element = driver.find_element_by_name("correo")
value = element.get_attribute("value")
if value == "rocio@rocio.com":
	print("el nombre esta bien")
else:
	print("el nombre esta mal")
	driver.find_element_by_name("correo").clear()
	driver.find_element_by_name("correo").send_keys("rocio@rocio.com")

element = driver.find_element_by_name("paypal")
value = element.get_attribute("value")
if value == "rocio@rocio.com":
	print("el nombre esta bien")
else:
	print("el nombre esta mal")
	driver.find_element_by_name("paypal").clear()
	driver.find_element_by_name("paypal").send_keys("rocio@rocio.com")


driver.find_element_by_class_name('boton-enviar').click()

time.sleep(2)

#elem = driver.find_element_by_name("contrasena")
#elem.send_keys("123")
#elem = driver.find_element_by_name("ciudad")
#elem.send_keys("Capital Federal")
#elem = driver.find_element_by_name("estado")
#elem.send_keys("Belgrano")
#elem = driver.find_element_by_name("pais")
#elem.send_keys("Argentina")
#elem = driver.find_element_by_name("direccion")
#elem.send_keys("calle falsa 123")
#elem = driver.find_element_by_name("codigoPostal")
#elem.send_keys("rocio@rocio.com")
#elem = driver.find_element_by_name("paypal")
#elem.send_keys("rocio@rocio.com")

