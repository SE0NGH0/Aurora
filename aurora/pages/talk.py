# aurora.state.home 모듈에서 필요한 State 및 HomeState를 가져옵니다.
import reflex as rx
from aurora.state.base import State
from aurora.state.home import HomeState

# 컴포넌트를 가져옵니다.
from ..components import container


color = "rgb(107,99,246)"
# 탭 버튼을 생성하는 함수
def tab_button1(name, href):
    """A tab switcher button."""
    return rx.link(
        rx.icon(tag="star", mr=2),  # 별 모양 아이콘
        name,  # 버튼 텍스트
        display="inline-flex",
        align_items="center",
        py=3,
        px=6,
        href=href,  # 버튼 클릭 시 이동할 경로
        border="1px solid #eaeaea",
        font_weight="semibold",
        border_radius="full",
    )
def tab_button2(name, href):
    """A tab switcher button."""
    return rx.link(
        rx.icon(tag="at_sign", mr=2),  # 별 모양 아이콘
        name,  # 버튼 텍스트
        display="inline-flex",
        align_items="center",
        py=3,
        px=5,
        href=href,  # 버튼 클릭 시 이동할 경로
        border="1px solid #eaeaea",
        font_weight="semibold",
        border_radius="full",
    )
def tab_button3(name, href):
    """A tab switcher button."""
    return rx.link(
        rx.icon(tag="search2", mr=2),  # 별 모양 아이콘
        name,  # 버튼 텍스트
        display="inline-flex",
        align_items="center",
        py=3,
        px=6,
        href=href,  # 버튼 클릭 시 이동할 경로
        border="1px solid #eaeaea",
        font_weight="semibold",
        border_radius="full",
    )
def tab_button4(name, href):
    """A tab switcher button."""
    return rx.link(
        rx.icon(tag="link", mr=2),  # 별 모양 아이콘
        name,  # 버튼 텍스트
        display="inline-flex",
        align_items="center",
        py=3,
        px=6,
        href=href,  # 버튼 클릭 시 이동할 경로
        border="1px solid #eaeaea",
        font_weight="semibold",
        border_radius="full",
    )
def tab_button5(name, href):
    """A tab switcher button."""
    return rx.link(
        rx.icon(tag="info_outline", mr=2),  # 별 모양 아이콘
        name,  # 버튼 텍스트
        display="inline-flex",
        align_items="center",
        py=3,
        px=6,
        href=href,  # 버튼 클릭 시 이동할 경로
        border="1px solid #eaeaea",
        font_weight="semibold",
        border_radius="full",
    )
def tab_button6(name, href):
    """A tab switcher button."""
    return rx.link(
        rx.icon(tag="question_outline", mr=2),  # 별 모양 아이콘
        name,  # 버튼 텍스트
        display="inline-flex",
        align_items="center",
        py=3,
        px=6,
        href=href,  # 버튼 클릭 시 이동할 경로
        border="1px solid #eaeaea",
        font_weight="semibold",
        border_radius="full",
    )
def tab_button7(name, href):
    """A tab switcher button."""
    return rx.link(
        rx.icon(tag="email", mr=2),  # 별 모양 아이콘
        name,  # 버튼 텍스트
        display="inline-flex",
        align_items="center",
        py=3,
        px=6,
        href=href,  # 버튼 클릭 시 이동할 경로
        border="1px solid #eaeaea",
        font_weight="semibold",
        border_radius="full",
    )
# 왼쪽에 표시되는 탭 스위처
def tabs():
    """The tab switcher displayed on the left."""
    return rx.box(
        rx.vstack(
            rx.container(
                rx.hstack(
                    rx.image(src="/aurora2.ico", width="50px", height="30px"),  # 오로라 아이콘
                    rx.text(
                        "Aurora", 
                        style={
                            "fontSize": "25px",
                            "fontWeight": "bolder",
                            "fontFamily": "Open Sans,Sans-serif",
                            "background": "-webkit-linear-gradient(-45deg, #77e67d, #3c8552)",
                            "-webkit-background-clip": "text",
                            "color": "transparent",
                        },
                        center_content=True,
                    ),  # 앱 이름
                ),
            ),
            tab_button1("Home", "/"),  # Home 탭 버튼
            tab_button2("My Profile","/myprofile"),
            tab_button3("Web Search","/websearch"),
            tab_button4("Video","/video"),
            tab_button5("Maps","/maps"),
            tab_button6("Ai Chat","/aichat"),
            tab_button7("Talk", "/talk"),
            rx.button(
                rx.icon(tag="moon"),
                on_click=rx.toggle_color_mode,
            ),
            rx.button("Log out", on_click=State.logout),  # 로그아웃 버튼
            rx.container(height='200px'),
            align_items="left",
            gap=4,
        ),
        py=4,
    )

def sidebar():
    """The sidebar displayed on the right."""
    return rx.vstack(
        align_items="start",
        gap=4,
        h="100%",
        py=4,
    )

# 피드의 헤더
def feed_header(HomeState):
    
    """The header of the feed."""
    return rx.hstack(
        rx.heading("Chat", size="md"),  # 피드의 제목
        rx.input(on_blur=HomeState.set_receive_user, placeholder="Please enter the person you would like to send the message to!"),  # 트윗 검색을 위한 입력 상자
        rx.button(
            "Select",
            on_click = HomeState.get_messages,
            border_radius="1em",
            box_shadow="rgba(0, 255, 0, 0.8) 0 15px 15px -10px",
            background_image="-webkit-linear-gradient(-45deg, #77e67d, #3c8552)",
            box_sizing="border-box",
            color="white",
            opacity=1,
            _hover={"opacity": 0.6},
        ),
        justify="space-between",
        p=4,
        border_bottom="3px solid #000000",
    )

# 개별 트윗을 표시하는 함수
def message(message):
    box_color = rx.cond(message.send_user == HomeState.user.username, "#e2eb3b","#99bed1")
    return rx.vstack(
        rx.box(
            rx.hstack(
                rx.hstack(
                    rx.container(width='2px'),
                    rx.avatar(name=message.send_user, size="sm"), 
                ),
                rx.box(
                    rx.hstack(
                        rx.text("@" + message.send_user, font_weight="bold"),  
                        rx.text("["+ message.created_at +"]"),
                    ),
                    rx.text(message.message, width="auto"),  
                    width = 'auto',
                ),
                py=4,
                gap=1,
                width='auto',
            ),
            align_items='start',
            width = '97%',
            margin_left='5px',
            border_radius='20px',
            background=box_color,
        ),
        rx.container(height='5px'),
        margin_left='10px',
        align_items='start',
        width='auto',
    )


# 피드 영역
def feed(HomeState):
    HomeState.syn_messages
    return rx.box(
        feed_header(HomeState),
        rx.container(height='10px'),
        rx.cond(
            HomeState.messages,
            rx.foreach(
                HomeState.messages,
                message
            ),
            rx.vstack(
                rx.button(
                    rx.icon(
                        tag="repeat",
                        mr=1,
                    ),
                    rx.text("Click to load chat"),
                    on_click=HomeState.get_messages,
                ),  # 트윗을 불러오는 버튼
                p=4,
            ),
        ),
        rx.hstack(
            rx.input(on_blur=HomeState.set_kakaotalk, placeholder="Write Message!"),
            rx.button(
                'Send',
                on_click = HomeState.sending_message,
                border_radius="1em",
                box_shadow="rgba(0, 255, 0, 0.8) 0 15px 15px -10px",
                background_image="-webkit-linear-gradient(-45deg, #77e67d, #3c8552)",
                box_sizing="border-box",
                color="white",
                opacity=1,
                _hover={"opacity": 0.6},
            )
        ),
        h="100%",
    )

# 홈 페이지
def talk():
    State.check_login
    return container(
        rx.grid(
            tabs(),
            feed(HomeState),
            sidebar(),
            grid_template_columns="1fr 4fr 1fr",
            h="100vh",
            gap=4,
        ),
        max_width="1600px",
    )