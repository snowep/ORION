import os

path = r"D:\Project\ORION\apps\api\src\db\migrate.js"
with open(path, "r", encoding="utf-8") as f:
    content = f.read()

# Fix: remove the unused 'get' variable and its promisify line
content = content.replace(
    "  const run = promisify(db.run.bind(db));\n  const get = promisify(db.get.bind(db));\n  const all = promisify(db.all.bind(db));\n  const exec = promisify(db.exec.bind(db));",
    "  const run = promisify(db.run.bind(db));\n  const all = promisify(db.all.bind(db));\n  const exec = promisify(db.exec.bind(db));"
)

with open(path, "w", encoding="utf-8") as f:
    f.write(content)

print("Fixed migrate.js")