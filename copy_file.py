import shutil
import os

source = os.path.join(os.path.expanduser('~/Desktop/сайт подушки'), ' -3 — копия.jpg')
dest = os.path.join(os.path.expanduser('~/Desktop/сайт подушки/img'), '-3 — копия.jpg')

shutil.copy2(source, dest)
