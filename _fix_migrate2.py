import os

path = r"D:\Project\ORION\apps\api\src\db\migrate.js"
with open(path, "r", encoding="utf-8") as f:
    content = f.read()

# Fix: wrap the 'down' case block in braces to avoid lexical declaration error
content = content.replace(
    """  case 'down':
    const version = parseInt(process.argv[3], 10);
    if (!version) {
      console.error('Usage: node migrate.js down <version>');
      process.exit(1);
    }
    rollbackMigration(version).catch(err => {
      console.error('[Migration] Rollback failed:', err.message);
      process.exit(1);
    });
    break;""",
    """  case 'down': {
    const version = parseInt(process.argv[3], 10);
    if (!version) {
      console.error('Usage: node migrate.js down <version>');
      process.exit(1);
    }
    rollbackMigration(version).catch(err => {
      console.error('[Migration] Rollback failed:', err.message);
      process.exit(1);
    });
    break;
  }""")

with open(path, "w", encoding="utf-8") as f:
    f.write(content)

print("Fixed migrate.js case block")