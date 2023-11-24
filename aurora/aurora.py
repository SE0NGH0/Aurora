"""Welcome to Reflex! This file outlines the steps to create a basic app."""
import reflex as rx

from .pages import home, login, signup, findpassword, myprofile, maps, search, video
from .state.base import State

app = rx.App(state=State)
app.add_page(login)
app.add_page(signup)
app.add_page(findpassword)
app.add_page(myprofile)
app.add_page(maps)
app.add_page(search)
app.add_page(video)
app.add_page(home, route="/", on_load=State.check_login())
app.compile()
