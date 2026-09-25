import subprocess, json, sys

CWD = r"D:\Project\ORION\packages\ui"

r = subprocess.run(
    ["npx", "eslint", "--print-config", "src/Providers.jsx"],
    capture_output=True, text=True, cwd=CWD, shell=True
)
print("returncode:", r.returncode)
cfg = None
for line in r.stdout.splitlines():
    line = line.strip()
    if line.startswith("{"):
        try:
            cfg = json.loads(line)
        except Exception:
            pass
if cfg is None:
    # try whole stdout
    try:
        cfg = json.loads(r.stdout)
    except Exception:
        print("RAW STDOUT (first 2000 chars):")
        print(r.stdout[:2000])
        print("STDERR (first 1000 chars):")
        print(r.stderr[:1000])
        sys.exit(1)

print("parser:", cfg.get("parser"))
print("parserOptions:", json.dumps(cfg.get("parserOptions"), indent=1))
print("env:", cfg.get("env"))
print("root:", cfg.get("root"))
print("rules has no-unused-vars:", "no-unused-vars" in (cfg.get("rules") or {}))
print("no-unused-vars config:", json.dumps((cfg.get("rules") or {}).get("no-unused-vars")))
