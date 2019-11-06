from selenium import webdriver
from selenium.webdriver.common.keys import Keys
import time

driver = webdriver.Chrome()
driver.get("file:///FRONT_SF/src/login.html")


if "login.html" in driver.title:
  print("Funciona")
else:
  print("No funciona")

elem = driver.find_element_by_name("nombreUsuario")
elem.send_keys("Rocarp29")
elem = driver.find_element_by_name("contraseña")
elem.send_keys("riverplate")

time.sleep(2)

driver.get("file:///C:/Users/Usuario/Desktop/registro.html")

elem = driver.find_element_by_name("nombreUsuario")
elem.send_keys("Rocarp29")
elem = driver.find_element_by_name("contraseña")
elem.send_keys("riverplate")

elem = driver.find_element_by_name("correo")
elem.send_keys("rocio.rodriguez@comunidad.ub.edu.ar")


elem = driver.find_element_by_name("repetir")
elem.send_keys("riverplate")





