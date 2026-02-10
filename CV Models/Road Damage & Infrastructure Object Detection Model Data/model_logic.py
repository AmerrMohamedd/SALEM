from ultralytics import YOLO
if __name__ == "__main__":
 
    model = YOLO("Model_80p.pt")  
    model.val()        
 
