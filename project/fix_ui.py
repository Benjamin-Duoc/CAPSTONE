import os
import re
import glob

components_dir = r"c:\REPOSITORIOS GIT\cipress\project\components"

# Files that need Volver fix
volver_fixes = {
    "PressReleaseDetailPage.tsx": "Volver a Comunicados",
    "PhotojournalismDetailPage.tsx": "Volver a la galería",
    "NewsDetailPage.tsx": "Volver a Análisis",
    "JobDetailPage.tsx": "Volver a Oportunidades",
    "CourseDetailPage.tsx": "Volver a Cursos"
}

# Files that need bg-gray-50 fix
# NewsModule, OpportunitiesModule, CoursesModule, FundingModule, EventsModule, PhotojournalismModule, etc.
# Actually, the user asked: "Tratar de dar una trama de fondo de color a las secciones de modo que queden unidos al llamado a la acción."
# Many main modules use: `<div className="bg-background min-h-screen">`
# Let's replace `bg-background` with `bg-gray-50` in specific top-level modules.

modules_bg_fix = [
    "NewsModule.tsx",
    "OpportunitiesModule.tsx",
    "CoursesModule.tsx",
    "FundingModule.tsx",
    "EventsModule.tsx",
    "SpecialistsModule.tsx",
    "PhotoGalleryModule.tsx",
    "ResourcesModule.tsx"
]

for filename, old_text in volver_fixes.items():
    filepath = os.path.join(components_dir, filename)
    if os.path.exists(filepath):
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        content = content.replace(old_text, "Volver")
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Fixed Volver in {filename}")

for filename in modules_bg_fix:
    filepath = os.path.join(components_dir, filename)
    if os.path.exists(filepath):
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        # Replace the first `bg-background` wrapper, usually at the beginning of the return statement
        content = content.replace('bg-background min-h-screen', 'bg-gray-50 min-h-screen')
        content = content.replace('bg-background', 'bg-gray-50', 1)  # If min-h-screen isn't there
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Added bg-gray-50 to {filename}")

