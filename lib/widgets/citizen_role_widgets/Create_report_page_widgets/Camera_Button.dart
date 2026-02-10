import 'package:flutter/material.dart';
import 'package:camera/camera.dart';

class CameraButton extends StatefulWidget {
  final Function(XFile?) onImagePicked;

  const CameraButton({super.key, required this.onImagePicked});

  @override
  State<CameraButton> createState() => _CameraButtonState();
}

class _CameraButtonState extends State<CameraButton> with WidgetsBindingObserver {
  CameraController? cameraController;
  XFile? pickedImage;
  bool isCameraOpen = false;
  bool isLoading = false;
  List<CameraDescription> cameras = [];

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addObserver(this);
    _initCameras();
  }

  @override
  void dispose() {
    cameraController?.dispose();
    WidgetsBinding.instance.removeObserver(this);
    super.dispose();
  }

  @override
  void didChangeAppLifecycleState(AppLifecycleState state) {
    if (cameraController == null || !cameraController!.value.isInitialized) return;

    if (state == AppLifecycleState.inactive) {
      cameraController?.dispose();
    } else if (state == AppLifecycleState.resumed) {
      _setupCameraController();
    }
  }

  Future<void> _initCameras() async {
    cameras = await availableCameras();
  }

  Future<void> _setupCameraController() async {
    if (cameras.isEmpty) return;
    cameraController = CameraController(cameras.first, ResolutionPreset.medium);
    await cameraController?.initialize();
    if (mounted) setState(() {});
  }

  Future<void> _openCamera() async {
    setState(() => isCameraOpen = true);
    await _setupCameraController();
  }

  Future<void> _takePicture() async {
    if (cameraController == null || !cameraController!.value.isInitialized) return;

    setState(() => isLoading = true);
    XFile image = await cameraController!.takePicture();
    widget.onImagePicked(image);
    setState(() {
      pickedImage = image;
      isCameraOpen = false;
      isLoading = false;
    });
  }

  @override
  Widget build(BuildContext context) {
    if (isCameraOpen) {
      if (cameraController == null || !cameraController!.value.isInitialized) {
        return const Center(child: CircularProgressIndicator());
      }
      return Stack(
        alignment: Alignment.center,
        children: [
          SizedBox(
            height: 250,
            width: double.infinity,
            child: CameraPreview(cameraController!),
          ),
          Positioned(
            bottom: 16,
            child: FloatingActionButton(
              onPressed: _takePicture,
              child: const Icon(Icons.camera),
            ),
          )
        ],
      );
    }

    return GestureDetector(
      onTap: _openCamera,
      child: Stack(
        alignment: Alignment.centerRight,
        children: [
          Container(
            width: double.infinity,
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
            decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(12),
              gradient: const LinearGradient(
                colors: [Color(0xFF1CB5A3), Color(0xFF0D47A1)],
              ),
            ),
            child: Row(
              children: [
                const Icon(Icons.camera_alt_outlined, color: Colors.white),
                const SizedBox(width: 10),
                Expanded(
                  child: Text(
                    pickedImage == null ? 'Take Photo' : 'Photo Selected',
                    maxLines: 1,
                    overflow: TextOverflow.ellipsis,
                    style: const TextStyle(color: Colors.white, fontWeight: FontWeight.bold),
                  ),
                ),
              ],
            ),
          ),
          if (isLoading)
            const Padding(
              padding: EdgeInsets.only(right: 16),
              child: SizedBox(
                width: 20,
                height: 20,
                child: CircularProgressIndicator(
                  color: Colors.white,
                  strokeWidth: 2,
                ),
              ),
            ),
        ],
      ),
    );
  }
}
