"""empty message

Revision ID: 13438a7b6b4d
Revises: ed1a4c85b601
Create Date: 2023-11-19 15:43:01.550370

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
import sqlmodel

# revision identifiers, used by Alembic.
revision: str = '13438a7b6b4d'
down_revision: Union[str, None] = 'ed1a4c85b601'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('unfollows',
    sa.Column('followed_username', sqlmodel.sql.sqltypes.AutoString(), nullable=False),
    sa.Column('follower_username', sqlmodel.sql.sqltypes.AutoString(), nullable=False),
    sa.PrimaryKeyConstraint('followed_username', 'follower_username')
    )
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('unfollows')
    # ### end Alembic commands ###
