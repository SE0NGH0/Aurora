# aurora.state.home 모듈에서 필요한 State 및 HomeState를 가져옵니다.
import reflex as rx
from aurora.state.base import State, Tweet, Status_message
from aurora.state.home import HomeState
from aurora.state.auth import AuthState
from aurora.state.base import User

# 컴포넌트를 가져옵니다.
from ..components import container

# 탭 버튼을 생성하는 함수
def tab_button1(name, href):
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

# 왼쪽에 표시되는 탭 스위처
def tabs():
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
            tab_button2("My Profile", "/myprofile"),
            tab_button3("Search", "/websearch"),
            tab_button4("Video", "/video"),
            tab_button5("Maps", "/maps"),
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
    return rx.box(
        rx.vstack(
            rx.container(height='8px'),
            rx.container(
                rx.button(
                    rx.icon(
                        tag="arrow_left", 
                        on_click=HomeState.right
                    ),
                ),
            ),
            rx.drawer(
                rx.drawer_overlay(
                    rx.drawer_content(
                        rx.drawer_header(
                            rx.input(
                                on_change=HomeState.set_friend,
                                placeholder="Search users",  # 사용자 검색을 위한 입력 상자
                                width="100%",
                            ),
                            rx.foreach(
                                HomeState.search_users,
                                lambda user: rx.vstack(
                                    rx.hstack(
                                        rx.avatar(name=user.username, size="sm"),  # 검색된 사용자의 아바타 이미지
                                        rx.text(user.username),  # 검색된 사용자의 사용자 이름
                                        rx.spacer(),
                                        rx.button(
                                            rx.icon(tag="add"),
                                            on_click=lambda: HomeState.follow_user(user.username),  # 사용자를 팔로우하는 버튼
                                        ),
                                        width="100%",
                                    ),
                                    py=2,
                                    width="100%",
                                ),
                            ),
                        ),
                        rx.drawer_body(
                            rx.box(
                                rx.heading("Followers", size="sm"),
                                rx.foreach(
                                    HomeState.followers,
                                    lambda follow: rx.vstack(
                                        rx.hstack(
                                            rx.avatar(name=follow.follower_username, size="sm"),  # 팔로워의 아바타 이미지
                                            rx.text(follow.follower_username),  # 팔로워의 사용자 이름
                                        width="100%",
                                        ),
                                        padding="1em",
                                    ),
                                ),
                                p=4,
                                border_radius="md",
                                border="1px solid #eaeaea",
                            ),
                            rx.container(height='8px'),
                            rx.box(
                                rx.heading("Following", size="sm"),
                                rx.foreach(
                                    HomeState.following,
                                    lambda follow: rx.vstack(
                                        rx.hstack(
                                            rx.avatar(name=follow.followed_username, size="sm"),  # 팔로잉 중인 사용자의 아바타 이미지
                                            rx.text(follow.followed_username),  # 팔로잉 중인 사용자의 사용자 이름
                                            rx.spacer(),
                                            rx.button(
                                                rx.icon(tag="minus"),
                                                on_click=lambda: HomeState.unfollow_user(follow.followed_username),
                                            ),
                                        ),
                                        padding="1em",
                                    ),
                                ),
                                p=4,
                                border_radius="md",
                                border="1px solid #eaeaea",
                                w="100%",
                            ),
                            align_items="start",
                            gap=4,
                            h="100%",
                            py=4,
                        ),
                        rx.drawer_footer(
                            rx.button(
                                "Close", on_click=HomeState.right
                            )
                        ),
                        bg="rgba(100, 100, 100, 0.7)",
                    )
                ),
                is_open=HomeState.show_right,
            ),  
        )
    )

def my_name(AuthState):
    return rx.grid(
        rx.container(height='16px'),
        rx.button("Edit Profile", on_click=HomeState.change),
        rx.hstack(
            rx.avatar(size="md"),  # 사용자의 아바타 이미지
            rx.text(AuthState.username, size = "md", fontSize = "18px", fontWeight = "bold"),    
            p=4,  
        ),
    )

def composer(HomeState):
    return rx.grid(
        rx.box(
            rx.modal(
                rx.modal_overlay(
                    rx.modal_content(
                        rx.modal_header("Edit Profile"),
                        rx.modal_body(
                            rx.text_area(
                                value=HomeState.status_message,
                                w="600px",
                                border=2,
                                placeholder="상태 메세지",  # 트윗을 작성하는 입력 상자
                                resize="none",
                                py=4,
                                px=0,
                                _focus={"border": 0, "outline": 0, "boxShadow": "none"},
                                on_change=HomeState.set_status_message,
                            ),
                        ),
                        rx.modal_footer(
                            rx.hstack(
                                rx.button(
                                    "Confirm", on_click=HomeState.post_status_message,
                                ),
                                rx.button(
                                    "Close", on_click=HomeState.change
                                ),
                            ),
                        ),
                    )
                ),
                is_open=HomeState.show,
            )
        )
    )
# 개별 트윗을 표시하는 함수
def tweet(tweet):
    """Display for an individual tweet in the feed."""
    image_tags = rx.cond(
        tweet.image_content,
        rx.foreach(
            tweet.image_content.split(", "),
            lambda image: rx.image(src=f"/{image}", alt="tweet image")
        ),
        rx.box()  # 이미지가 없는 경우 빈 리스트를 반환합니다.
    ),

    return rx.grid(
        rx.vstack(
            rx.avatar(name=tweet.author, size="sm"),  # 트윗 작성자의 아바타 이미지
        ),
        rx.box(
            rx.text("@" + tweet.author, font_weight="bold"),  # 트윗 작성자의 사용자 이름
            rx.text(tweet.content, width="100%"),  # 트윗 내용
            *image_tags
        ),
        grid_template_columns="1fr 5fr",
        py=4,
        gap=1,
        border_bottom="1px solid #ededed",
    )
# 개별 트윗을 표시하는 함수
def edit_profile(status_message):
    return rx.box(
        rx.text(status_message.content, width="100%"),  # 트윗 내용
        py=4,
        gap=1,
        border_bottom="1px solid #ededed",
    ),

# 피드 영역
def feed(HomeState):
    return rx.box(
        my_name(AuthState),
        composer(HomeState),
        """
        rx.cond(
            HomeState.status_messages,
            rx.foreach(
                HomeState.status_messages,
                edit_profile
            ),
            rx.hstack(
                rx.button(
                    rx.text("..."), 
                    on_click=HomeState.get_status_messages,
                ),
            ),
            border_bottom="3px solid #ededed",
        ),
        """,
        rx.container(height='10px'),
        rx.cond(
            HomeState.tweets,
            rx.foreach(
                HomeState.tweets,
                tweet
            ),
            rx.vstack(
                rx.button(
                    rx.icon(
                        tag="repeat",
                        mr=1,
                    ),
                    rx.text("My Posts"),
                    on_click=HomeState.get_user_tweets,
                ),  # 트윗을 불러오는 버튼
                p=4,
            ),
        ),
    )
# 마이 페이지
def myprofile():
    """The home page."""
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
