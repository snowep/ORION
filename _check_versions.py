import json, os

ROOT = r"D:\Project\ORION\node_modules"

def ver(p):
    try:
        with open(os.path.join(ROOT, p, "package.json"), encoding="utf-8") as f:
            return json.load(f)["version"]
    except FileNotFoundError:
        return "NOT INSTALLED"

print("root espree:", ver("espree"))
print("root eslint-scope:", ver("eslint-scope"))
print("root eslint-visitor-keys:", ver("eslint-visitor-keys"))
print("root eslint:", ver("eslint"))
print("nested eslint/espree:", ver("eslint\\node_modules\\espree"))
print("nested eslint/eslint-scope:", ver("eslint\\node_modules\\eslint-scope"))
print("nested eslint/eslint-visitor-keys:", ver("eslint\\node_modules\\eslint-visitor-keys"))
