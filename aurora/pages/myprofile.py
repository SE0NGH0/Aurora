# aurora.state.home 모듈에서 필요한 State 및 HomeState를 가져옵니다.
import reflex as rx
from aurora.state.base import State, Tweet
from aurora.state.home import HomeState
from aurora.state.auth import AuthState
from aurora.state.base import User


# 컴포넌트를 가져옵니다.
from ..components import container


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

# 왼쪽에 표시되는 탭 스위처
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

# 오른쪽에 표시되는 사이드바
def sidebar(HomeState):
    """The sidebar displayed on the right."""
    rx.box(
        rx.button(
            rx.icon(tag="arrow_left", on_click=HomeState.right)
        ),
        rx.drawer(
            rx.drawer_overlay(
                rx.drawer_content(
                    rx.drawer_header("Confirm"),
                    rx.drawer_body(
                        "Do you want to confirm example?"
                    ),
                    rx.drawer_footer(
                        rx.button(
                            "Close", on_click=HomeState.right
                        )
                    ),
                    bg="rgba(0, 0, 0, 0.3)",
                )
            ),
            is_open=HomeState.show_right,
        )
    )

# 피드의 헤더
def feed_header(HomeState):
    """The header of the feed."""
    return rx.hstack(
        rx.heading("Story", size="md"),  # 피드의 제목
        rx.input(on_change=HomeState.set_search, placeholder="Search"),  # 트윗 검색을 위한 입력 상자
        justify="space-between",
        p=4,
        border_bottom="1px solid #ededed",
    )

def composer(AuthState):
    """The composer for new tweets."""
    return rx.grid(
        rx.hstack(
            rx.avatar(size="md"),  # 사용자의 아바타 이미지
            rx.text(AuthState.username, 
                    size = "md", fontSize = "18px", fontWeight = "bold"
                    ),
            p=4,
        ),
        
    )

# 개별 트윗을 표시하는 함수
def tweet(tweet):
    """Display for an individual tweet in the feed."""
    return rx.grid(
        rx.vstack(
            rx.avatar(name=tweet.author, size="sm"),  # 트윗 작성자의 아바타 이미지
        ),
        rx.box(
            rx.text("@" + tweet.author, font_weight="bold"),  # 트윗 작성자의 사용자 이름
            rx.text(tweet.content, width="100%"),  # 트윗 내용
        ),
        grid_template_columns="1fr 5fr",
        py=4,
        gap=1,
        border_bottom="1px solid #ededed",
    )

# 피드 영역
def feed(HomeState):
    """The feed."""
    return rx.box(
        feed_header(HomeState),
        composer(AuthState),
        
    )

# 홈 페이지
def myprofile():
    """The home page."""
    return container(
        rx.grid(
            tabs(),
            feed(HomeState),
            sidebar(HomeState),
            grid_template_columns="1fr 3fr 1fr",
            h="100vh",
            gap=4,
        ),
        max_width="1300px",
    )
