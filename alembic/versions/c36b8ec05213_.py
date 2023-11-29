"""empty message

Revision ID: c36b8ec05213
Revises: 11f056b33881
Create Date: 2023-11-21 14:34:02.421960

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
import sqlmodel

# revision identifiers, used by Alembic.
revision: str = 'c36b8ec05213'
down_revision: Union[str, None] = '11f056b33881'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('tweet', sa.Column('image_content', sqlmodel.sql.sqltypes.AutoString(), nullable=False))
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('tweet', 'image_content')
    # ### end Alembic commands ###