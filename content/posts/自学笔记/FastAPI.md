---
title: 'FastAPI 学习笔记'
summary: FastAPI 学习记录，参考黑马程序员 PythonWeb 开发课程内容
date: 2026-11-03T08:00:00+08:00
categories: 自学笔记
---

## HTTP 方法

- POST：创建数据
- GET：读取数据
- PUT：更新数据
- DELETE：删除数据

## 第一个程序

```py
from fastapi import FastAPI

app = FastAPI()

@app.get("/") # 路径操作装饰器
async def root(): # 路径操作函数，路径 /，操作 get，函数 root()
    return {"message": "Hello World"}
```

FastAPI 服务启动时自动生成以下两个文档
交互式文档1：http://127.0.0.1:8000/docs
交互式文档2：http://127.0.0.1:8000/redoc

每当 FastAPI 接收一个使用 GET 方法访问 / 的请求时这个 root 函数会被调用。

返回值会自动转为 JSON 返回给前端

## 请求参数

### 路径参数

一般用来定位资源

```py
from typing import Annotated
from fastapi import FastAPI, Path

app = FastAPI()

@app.get("/items/{item_id}")
async def read_item(item_id: int):
    return {"item_id": item_id}

@app.get("/books/{book_id}")
async def read_book(book_id: Annotated[int, Path(ge=0, le=1000, description="图书 ID")]):
    return {"book_id": book_id}
```

路径参数和函数参数要同名，使用类型注解可以自动转换变量类型，且是必要参数，无需默认值

使用 `Annotated[int, Path()]` 可以在类型注解的同时对路径参数进行校验，提供多种校验规则，详见[文档](https://fastapi.tiangolo.com/zh/reference/parameters/#fastapi.Path)

### 查询参数

一般用于筛选、排序、分页

```py
from typing import Annotated
from fastapi import FastAPI, Query

app = FastAPI()

@app.get("/items")
async def select_items(skip: int = 0, limit: int = 2):
    fake_items_db = [{"item_name": "Foo"}, {"item_name": "Bar"}, {"item_name": "Baz"}]
    return fake_items_db[skip: skip + limit]

@app.get("/books")
async def read_books(q: Annotated[list[str] | None, Query()] = None):
    query_books = {"q": q}
    return query_books
```

函数参数不是路径参数时，会被解释为查询参数，位于 URL 后的 ? 之后，以 & 分隔

类似 Python 设置默认值则为可选参数，不设则为必要参数

使用 `Annotated[list[str] | None, Query()]` 进行校验，校验规则见[文档](https://fastapi.tiangolo.com/zh/reference/parameters/#fastapi.Query)

要声明类型为 `list` 的查询参数，需要显式地使用 `Query`，否则会被解释为请求体

### 请求体

一般用于客户端向服务端上传数据

```py
from typing import Annotated
from fastapi import FastAPI
from pydantic import BaseModel, Field

app = FastAPI()

class Item(BaseModel):
    name: Annotated[str, Field(min_length=2, max_length=20)]
    description: str | None = None
    price: Annotated[float, Field(ge=0)] = 0.0

@app.post("/upload_item")
async def create_item(item: Item):
    return item
```

定义一个继承 pydantic 的 BaseModel 的类即可作为自己的模型，接收前端传递的 JSON 并自动转换与校验

前端的 JSON 键名须与后端模型定义相同，有默认值的可省略

类似的，可使用 `Annotated[str, Field(min_length=2, max_length=20)]` 进行校验，规则见[文档](https://pydantic.dev/docs/validation/latest/concepts/fields/)

**注意：**`BaseModel` 和 `Field` 均从 `pydantic` 导入

## 响应数据

### 响应数据类型

```py
from fastapi import FastAPI
from fastapi.responses import HTMLResponse, FileResponse

app = FastAPI()

@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.get("/html", response_class=HTMLResponse)
async def get_html():
    return "<h1>Hello World!</h1>"

@app.get("/img")
async def get_img():
    img_path = 'backend/img.jpg'
    return FileResponse(img_path)
```

默认响应类型为 `JSONResponse`，简单固定响应类型可用 `response_class` 参数指定，其他如文件可直接返回响应对象

### 响应数据格式

```py
from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class Item(BaseModel):
    name: str
    description: str
    price: float

@app.get("/item")
async def get_item(item: Item) -> Item:
    return item

@app.get("/item/v2", response_model=Item)
async def get_item_v2(item: Item):
    return {
        'name': item.name,
        'description': item.description,
        'price': item.price,
    }
```

可以通过函数返回值类型注解，指定响应数据格式，会自动校验并转换为 JSON

当返回形式不是该类的实例时，为避免编辑器产生类型警告，可以不写函数返回值类型注解，而是用 `response_model` 参数指定响应数据格式。
此时返回值中若有多余字段会被自动过滤，只保留指定数据格式中的字段；若缺少字段则会在服务端报错

## 异常处理

```py
from fastapi import FastAPI, HTTPException

app = FastAPI()

@app.get("/item/{id}")
async def get_item(id: int):
    if id > 1000:
        raise HTTPException(status_code=404, detail="Item not found")
    return {"id": id}
```

使用 `raise` 抛出异常并返回给客户端，`detail` 可写能转换为 JSON 的任何内容，不限于字符串

## 中间件

用于为每个请求添加统一的处理逻辑

```py
from fastapi import FastAPI, Request

app = FastAPI()

@app.middleware("http")
async def middleware_1(request: Request, call_next):
    print("1 start") # 请求处理前的操作
    response = await call_next(request)
    print("1 end") # 响应返回前的操作
    return response

@app.middleware("http")
async def middleware_2(request: Request, call_next):
    print("2 start")
    response = await call_next(request)
    print("2 end")
    return response
```

使用 `@app.middleware("http")` 装饰器定义中间件函数，函数应接收两个固定参数：客户端请求 `request` 和将请求送往路径操作函数的 `call_next` 函数

`call_next` 为异步函数，调用时需加 `await`

多个中间件函数的执行顺序由书写顺序决定，请求接收时自下而上，响应返回时自上而下，即 `2 start -> 1 start -> 路由 -> 1 end -> 2 end`

## 依赖注入

抽取可复用组件，实现代码复用、解耦

```py
from typing import Annotated
from fastapi import FastAPI, Depends

app = FastAPI()

async def common_parameters(
        q: str | None = None,
        skip: int = 0,
        limit: int = 100):
    return {"q": q, "skip": skip, "limit": limit}

@app.get("/items/")
async def read_items(commons: Annotated[dict, Depends(common_parameters)]):
    return commons

@app.get("/users/")
async def read_users(commons: Annotated[dict, Depends(common_parameters)]):
    return commons
```

定义一个正常的路径操作函数作为依赖项，复用时使用 `Depends()` 声明该参数来自哪个依赖，其接收依赖项名称作为参数，无需结尾小括号

## ORM

以下为使用 SQLAlchemy 操作 SQLite 数据库

### 建库建表

```py
from contextlib import asynccontextmanager
from datetime import datetime
from fastapi import FastAPI
from sqlalchemy import create_engine, String, ForeignKey, DateTime, func
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship

# 创建数据库引擎
engine = create_engine('sqlite+pysqlite:///backend/local_storage/earthsense.db', echo=True)

# 创建声明式基类
class Base(DeclarativeBase):
    # 所有表均拥有的列
    create_time: Mapped[datetime] = mapped_column(DateTime, default=func.now())
    update_time: Mapped[datetime] = mapped_column(DateTime, default=func.now(), onupdate=func.now())

# 声明映射类
class User(Base):
    # 表名
    __tablename__ = "user"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(30))
    fullname: Mapped[str | None]
    addresses: Mapped[list["Address"]] = relationship(back_populates="user")

    # 定义打印格式
    def __repr__(self) -> str:
        return f"User(id={self.id!r}, name={self.name!r}, fullname={self.fullname!r})"

class Address(Base):
    __tablename__ = "address"

    id: Mapped[int] = mapped_column(primary_key=True)
    email_address: Mapped[str]
    user_id = mapped_column(ForeignKey("user.id"))  # 外键可自动推断类型，无需注释
    user: Mapped[User] = relationship(back_populates="addresses")

    def __repr__(self) -> str:
        return f"Address(id={self.id!r}, email_address={self.email_address!r})"

@asynccontextmanager
async def lifespan(app: FastAPI):
    # 服务端启动时运行
    # 在数据库中创建表
    Base.metadata.create_all(engine)
    yield
    # 服务端结束时运行
    pass

app = FastAPI(lifespan=lifespan)
```

创建引擎
- SQLite 的路径格式为 `sqlite+<Python DBAPI>:///<数据库文件保存路径>`
- `<Python DBAPI>` 省略时使用默认值
- 特别的，可以用 `:memory:` 作为保存路径，实现在内存内建库，便于测试
- `echo=True` 表示输出 SQL 日志

基类
- 声明式基类 `Base` 需继承 `DeclarativeBase`
- 此类中的属性为所有表均拥有的列

映射类
- 普通映射类需继承基类 `Base`
- 字段格式为 `属性名: Mapped[Python类型] = mapped_column(SQL类型?, 约束/默认值参数...)`
- 必须有主键
- `mapped_column()` 中的常用约束
  - `primary_key=True`：主键
  - `unique=True`：唯一约束
  - `index=True`：建普通索引
  - `ForeignKey("<表名>.<列名>")`：外键
- `mapped_column()` 中默认值相关参数
  - `default`：Python 端 INSERT 时采用
  - `server_default`：数据库端硬定义
  - `onupdate`：Python 端 UPDATE 时采用
- `relationship()` 不定义数据库列，是 Python 端的 ORM 对象导航
  - 一对多关系中，`ForeignKey` 定义在多的一方的表中，指向一的一方，`relationship` 在两边用 `back_populates` 互指
  - 类型注解：一的一方为 `Mapped[list["T"]]`，多的一方为 `Mapped["V"]`，类名用引号包裹，可避免循环引用
  
命名建议
- 表名：小写加下划线，常用复数
- 列名：小写加下划线，布尔字段用 is_、has_ 开头
- 外键列：<被引用表名单数>_id

### 在路径操作函数中进行 ORM

```py
# db.py
from typing import Annotated
from fastapi import Depends
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, Session

# 创建数据库引擎
engine = create_engine('sqlite+pysqlite:///backend/local_storage/earthsense.db', echo=True)

# session 的工厂函数
session_factory = sessionmaker(engine)

# 创建 session 的依赖函数
def get_session():
    with session_factory() as session:
        try:
            yield session
            session.commit() # 提交事务
        except Exception:
            session.rollback() # 回滚
            raise

# 依赖返回的 session 类型，简化类型注释代码
SessionDep = Annotated[Session, Depends(get_session)]
```

`db.py` 向外暴露引擎、session 依赖函数及依赖类型

session 的工厂函数单独创建，全局唯一，但一般不再外部直接调用

```py
# model.py
from datetime import datetime
from sqlalchemy import String, ForeignKey, DateTime, func
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship

class Base(DeclarativeBase):
    create_time: Mapped[datetime] = mapped_column(DateTime, default=func.now())
    update_time: Mapped[datetime] = mapped_column(DateTime, default=func.now(), onupdate=func.now())

class User(Base):
    __tablename__ = "user"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(30))
    fullname: Mapped[str | None]
    addresses: Mapped[list["Address"]] = relationship(back_populates="user")

    def __repr__(self) -> str:
        return f"User(id={self.id!r}, name={self.name!r}, fullname={self.fullname!r})"


class Address(Base):
    __tablename__ = "address"

    id: Mapped[int] = mapped_column(primary_key=True)
    email_address: Mapped[str]
    user_id = mapped_column(ForeignKey("user.id"))
    user: Mapped[User] = relationship(back_populates="addresses")

    def __repr__(self) -> str:
        return f"Address(id={self.id!r}, email_address={self.email_address!r})"
```

`model.py` 向外暴露基类及各映射类

```py
# main.py
from contextlib import asynccontextmanager
from fastapi import FastAPI
from sqlalchemy import select
from backend.db import engine, SessionDep
from backend.model import Base, User

@asynccontextmanager
async def lifespan(app: FastAPI):
    Base.metadata.create_all(engine)
    yield
    pass

app = FastAPI(lifespan=lifespan)

# 依赖注入获取 session
@app.get("/users")
def get_users(session: SessionDep):
    result = session.execute(select(User))
    users = result.scalars().all()
    return users
```

`main.py` 导入引擎 engine 和基类 Base 进行建库建表，导入 session 依赖类型 SessionDep 和映射类 User 进行 ORM 操作

依赖类型 SessionDep 注解会使 FastAPI 自动调用依赖函数 `get_session()` 获取 session

### 查询

查询所有：`session.execute(select(<映射类名>))`

```py
result = session.execute(select(User))
users = result.scalars().all() # 提取所有
users = result.scalars().first() # 提取首个
users = result.scalar_one_or_none() # 提取一个或者 None
```

按主键查询：`session.get(<映射类名>.<主键值>)`

```py
user = session.get(User, 1)
```

条件查询：`session.execute(select(<映射类名>).where(<条件表达式>))`

`<条件表达式>` 内部可以有数值条件、模糊条件、包含条件，外部可以用与或非 `& | ~` 连接

- 模糊条件：`.like()` 字符串匹配，`%` 匹配空与任意个字符，`_` 匹配单个字符
- 包含条件：`in_()`

```py
result = session.execute(select(User).where(User.id > 0))
result = session.execute(select(User).where(User.name.like("a%")))
result = session.execute(select(User).where(User.name.like("a_") & (User.id > 0)))
result = session.execute(select(User).where(User.id.in_([1, 2, 3])))
```

聚合查询：`session.execute(select(func.<方法名>(<映射类名>.<属性>)))`

常用方法 `func.count()` `func.max()` `func.min()` `func.sum()` `func.avg()`

```py
result = session.execute(select(func.count(User.id)))
num = result.scalar() # 提取单个标量
```

分页查询：`select(<映射类名>).offset(<跳过记录数>).limit(<返回记录数>)`

当页码从 1 开始时 `跳过记录数 = (当前页码 -1) * 每页记录数`

```py
@app.get("/users")
def get_users(session: SessionDep, page: int = 1, page_size: int = 3):
    offset = (page - 1) * page_size
    result = session.execute(select(User).offset(offset).limit(page_size))
    users = result.scalars().all()
    return users
```

### 新增

```py
# model.py
class User(Base):
    __tablename__ = "user"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(30))
    fullname: Mapped[str | None]
    addresses: Mapped[list["Address"]] = relationship(back_populates="user")

    def __repr__(self) -> str:
        return f"User(id={self.id!r}, name={self.name!r}, fullname={self.fullname!r})"
```

```py
# schema.py
from typing import Annotated
from pydantic import BaseModel, Field

class UserCreate(BaseModel):
    name: Annotated[str, Field(max_length=30)]
    fullname: str | None = None
```

```py
# main.py
from fastapi import FastAPI
from backend.db import SessionDep
from backend.model import User
from backend.schema import UserCreate

app = FastAPI()

@app.post("/user/create")
def create_user(session: SessionDep, user: UserCreate):
    user_orm = User(**user.model_dump())
    session.add(user_orm)
    return user_orm
```

对于 `model.py` 中的一个 ORM 类，需在 `schema.py` 中定义若干请求体与响应体类，以便前后端数据交互

数据添加时先创建 ORM 对象，然后用 `session.add(<ORM 对象>)` 添加数据

`.model_dump()` 是 pydantic.BaseModel 的方法，提取模型的字典表示

### 更新

```py
# schema.py
from typing import Annotated
from pydantic import BaseModel, Field

class UserUpdate(BaseModel):
    name: Annotated[str, Field(max_length=30)]
    fullname: str | None = None
```

```py
# main.py
from fastapi import FastAPI, HTTPException
from backend.db import SessionDep
from backend.model import User
from backend.schema import UserUpdate

app = FastAPI()

@app.put("/user/update/{user_id}")
def update_user(session: SessionDep, user_id: int, user: UserUpdate):
    user_orm = session.get(User, user_id)
    if user_orm is None:
        raise HTTPException(status_code=404, detail="User not found")
    for key, value in user.model_dump(exclude_unset=True).items():
        setattr(user_orm, key, value)
    return user_orm
```

创建更新 schema 模型，先查询，再直接修改 ORM 对象属性值即可

`exclude_unset` 参数可排除客户端未显式传递的参数

### 删除

```py
from fastapi import FastAPI, HTTPException
from backend.db import SessionDep
from backend.model import User

app = FastAPI()

@app.delete("/user/delete/{user_id}")
def delete_user(session: SessionDep, user_id: int):
    user_orm = session.get(User, user_id)
    if user_orm is None:
        raise HTTPException(status_code=404, detail="User not found")
    session.delete(user_orm)
    return user_orm
```

先查询再删除