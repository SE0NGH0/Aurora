import reflex as rx
from aurora.state.base import State
from aurora.state.home import HomeState
from ..components import container

# 탭 버튼을 생성하는 함수
def tab_button(name, href):
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
            tab_button("Home", "/"),  # Home 탭 버튼
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
    return rx.vstack(
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
    )
