from ultralytics import YOLO
if __name__ == "__main__":
    model = YOLO("yolov8n.pt")

    model.train(
        data="data.yaml",
        epochs=120,
        imgsz=512,
        batch=16,
        freeze=10,
        device=0,
        #augmentation parameters
        mosaic=0.3,
        mixup=0.0,
        fliplr=0.5,
        hsv_h=0.01,
        hsv_s=0.3,
        hsv_v=0.3
    )
    # Model summary (fused): 72 layers, 3,006,038 parameters, 0 gradients, 8.1 GFLOPs 
    #              Class     Images  Instances      Box(P          R      mAP50  mAP50-95): 100%|██████████| 1/1 [00:00<00:00,  9.58it/s]     
    #                all         20         24      0.867      0.748      0.803      0.378
    #               hole          9         13       0.78      0.769      0.728      0.402
    #               pole         11         11      0.954      0.727      0.879      0.353