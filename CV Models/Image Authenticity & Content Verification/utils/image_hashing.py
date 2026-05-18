from PIL import Image
import imagehash

hash_db = set()

def check_duplicate(img_path):

    img_hash = imagehash.average_hash(
        Image.open(img_path)
    )

    duplicate_score = 1.0

    for h in hash_db:

        if img_hash - h < 5:
            duplicate_score = 0.0
            break

    hash_db.add(img_hash)

    return duplicate_score