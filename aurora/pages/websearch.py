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
def tab_button4(name, href):
    """A tab switcher button."""
    return rx.link(
        rx.icon(tag="info", mr=2),  # 별 모양 아이콘
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

def tabs():
    """The tab switcher displayed on the left."""
    return rx.box(
        rx.vstack(
            rx.container(
                rx.hstack(
                    rx.icon(tag="spinner", mr=2, color='green'),  # 달 모양 아이콘
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
            tab_button2("My Profile", "/myprofile"),
            tab_button3("Video", "/video"),
            tab_button4("Maps", "/maps"),
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

def trend(key: str, value: str):
    return rx.vstack(
        rx.box(
            rx.container(
                rx.container(
                    rx.text(f'{key}위 : {value}'),
                ),
                align='start',
                width='300px',
                font_weight="bold",
            ),
        ),
        align='start',
        border='1px solid black',  # 테두리 스타일 지정
        border_radius='12px',  # 동그란 테두리를 위한 반지름 값 지정
        padding='5px',  # 테두리와 내용 사이의 여백 지정
    )

def sidebar(HomeState):
    """The sidebar displayed on the right."""
    return rx.grid(
        rx.vstack(
            rx.container(
                rx.button(
                    '실시간 검색어',
                    on_click = HomeState.google_crawler,
                    border_radius="1em",
                    box_shadow="rgba(151, 65, 252, 0.8) 0 15px 30px -10px",
                    background_image="linear-gradient(144deg,#AF40FF,#5B42F3 50%,#00DDEB)",
                    box_sizing="border-box",
                    color="white",
                    opacity="0.6",
                    _hover={"opacity": 1},
                ),
            ),
            align_items="start",
            gap=4,
            h="100%",
            py=4,
        ),
        rx.vstack(
            rx.foreach(
                HomeState.web_trend,
                lambda entry: trend(
                    entry[0],entry[1]
                ),
            ),
        ),
        grid_template_rows="1fr 9fr",
        align_items="start",
        gap=4,
        h="100%",
        py=4,
    )
    


# 피드의 헤더
def feed_header(HomeState):
    
    """The header of the feed."""
    return rx.hstack(
        rx.heading("Search", size="md"),  # 피드의 제목
        rx.input(on_blur=HomeState.set_video_search, placeholder="Search.."),  # 트윗 검색을 위한 입력 상자
        rx.button(
            "Search",
            on_click = HomeState.search_video,
            border_radius="1em",
            box_shadow="rgba(151, 65, 252, 0.8) 0 15px 30px -10px",
            background_image="linear-gradient(144deg,#AF40FF,#5B42F3 50%,#00DDEB)",
            box_sizing="border-box",
            color="white",
            opacity="0.6",
            _hover={"opacity": 1},
        ),
        justify="space-between",
        p=4,
        border_bottom="3px solid #ededed",
    )

# 피드 영역
def feed(HomeState):
    return rx.box(
        feed_header(HomeState),
        rx.video(
            url = HomeState.show_video,
            max_width = '700px',
            max_height = 'auto',
            playing = True,
            loop = True,
        ),
        h="100%",
    )

# 홈 페이지
def websearch():
    State.check_login
    return container(
        rx.grid(
            tabs(),
            feed(HomeState),
            sidebar(HomeState),
            grid_template_columns="1fr 4fr 1fr",
            h="100vh",
            gap=4,
        ),
        max_width="1600px",
    )