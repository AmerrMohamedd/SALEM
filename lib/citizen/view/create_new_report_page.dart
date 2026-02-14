import 'package:flutter/material.dart';
import 'package:salem_app/core/Constants.dart';
import 'package:salem_app/citizen/data/report_model.dart';
import 'package:salem_app/citizen/data/services/report_Repository.dart';
import 'package:salem_app/citizen/data/ReportLocationController.dart';
import 'package:salem_app/citizen/view/modules/Create_report_page_widgets/Camera_Button.dart';
import 'package:salem_app/citizen/view/modules/Create_report_page_widgets/get_currentLocation_section.dart';
import 'package:salem_app/citizen/view/modules/Create_report_page_widgets/problem_selector_section.dart';
import 'package:salem_app/auth/view/modules/customForm_textField.dart';
import 'package:salem_app/Views/widgets/common_widgets/section_title.dart';
import 'package:camera/camera.dart';

class CreateNewReportPage extends StatefulWidget {
  const CreateNewReportPage({super.key});

  @override
  State<CreateNewReportPage> createState() => _CreateNewReportPageState();
}

class _CreateNewReportPageState extends State<CreateNewReportPage> {
  final ReportLocationController locationController =
      ReportLocationController();

  bool isLoading = false;
  XFile? pickedImage;

  String? selectedProblem;

  final TextEditingController customAddressController = TextEditingController();
  final TextEditingController descriptionController = TextEditingController();
  final ReportRepository reportRepository = ReportRepository();

  Future<void> handleGetCurrentLocation() async {
    setState(() => isLoading = true);

    bool success = await locationController.fetchCurrentLocation();

    setState(() => isLoading = false);

    if (!success && mounted) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text(
            "Please enable location services (GPS) and grant permissions.",
          ),
          duration: Duration(seconds: 3),
        ),
      );
    }
  }

  void submitReport() {
    if (selectedProblem == null) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Please select a problem type')),
      );
      return;
    }

    final locationData = locationController.location.value;
    if (locationData == null) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Please select a location first')),
      );
      return;
    }

    if (descriptionController.text.trim().isEmpty) {
      ScaffoldMessenger.of(
        context,
      ).showSnackBar(const SnackBar(content: Text('Description is required')));
      return;
    }

    if (pickedImage == null) {
      ScaffoldMessenger.of(
        context,
      ).showSnackBar(const SnackBar(content: Text('Please take a photo')));
      return;
    }

    final newReport = ReportModel(
      id:
          DateTime.now().millisecondsSinceEpoch
              .toString(), //  بدي اي قيمة فريدة مناسبة
      type: selectedProblem!,
      status: "Under Review",
      createdAt: DateTime.now(),
      description: descriptionController.text,
      imageUrl: pickedImage!.path,
      location: locationData.address!,
    );

    reportRepository.addReport(newReport);
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(content: Text('Report submitted successfully')),
    );

    Future.delayed(const Duration(seconds: 1), () {
      Navigator.pop(context);
    });
  }

  @override
  void dispose() {
    customAddressController.dispose();
    descriptionController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        centerTitle: true,
        title: ShaderMask(
          shaderCallback:
              (bounds) => const LinearGradient(
                colors: [Color(0xFF00BE9B), Color(0xFF1B4374)],
              ).createShader(Rect.fromLTWH(0, 0, bounds.width, bounds.height)),
          child: const Text(
            'Add Report',
            style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold),
          ),
        ),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(12),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            ProblemsSelectorSection(
              selectedProblem: selectedProblem,
              onProblemSelected: (problem) {
                setState(() {
                  selectedProblem = problem;
                });
              },
            ),

            SectionTitle(title: 'Location', color: kPrimaryColor),
            const SizedBox(height: 6),
            Stack(
              alignment: Alignment.centerRight,
              children: [
                GetCurrentLocationSection(
                  locationController: locationController,
                  onGetCurrentLocation: handleGetCurrentLocation,
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

            const SizedBox(height: 10),

            const SectionTitle(
              title: 'Report Address (For Accuracy)',
              color: kPrimaryColor,
            ),
            CustomFormTextfield(
              type: 'text',
              controller: customAddressController,
              hintText: 'Enter address here',
            ),

            const SectionTitle(title: 'Description', color: kPrimaryColor),
            const SizedBox(height: 5),
            CustomFormTextfield(
              type: 'text',
              controller: descriptionController,
              maxLines: 3,
              hintText: 'Enter description here',
            ),

            const SizedBox(height: 10),

            CameraButton(
              onImagePicked: (image) {
                setState(() {
                  pickedImage = image;
                });
                debugPrint("Picked image: ${image?.path}");
              },
            ),

            const SizedBox(height: 20),

            Row(
              children: [
                Expanded(
                  child: GestureDetector(
                    onTap: () {
                      Navigator.pop(context);
                    },
                    child: Container(
                      height: 50,
                      alignment: Alignment.center,
                      decoration: BoxDecoration(
                        border: Border.all(color: kPrimaryColor),
                        borderRadius: BorderRadius.circular(24),
                        color: Colors.transparent,
                      ),
                      child: const Text(
                        'Cancel',
                        style: TextStyle(
                          fontSize: 16,
                          color: kPrimaryColor,
                          fontWeight: FontWeight.w500,
                        ),
                      ),
                    ),
                  ),
                ),
                const SizedBox(width: 12),
                Expanded(
                  child: GestureDetector(
                    onTap: isLoading ? null : submitReport,
                    child: Container(
                      height: 50,
                      alignment: Alignment.center,
                      decoration: BoxDecoration(
                        gradient: const LinearGradient(
                          colors: [Color(0xFF00BE9B), Color(0xFF1B4374)],
                        ),
                        borderRadius: BorderRadius.circular(24),
                      ),
                      child:
                          isLoading
                              ? const SizedBox(
                                height: 18,
                                width: 18,
                                child: CircularProgressIndicator(
                                  strokeWidth: 2,
                                  color: Colors.white,
                                ),
                              )
                              : const Text(
                                'Submit Report',
                                style: TextStyle(
                                  color: Colors.white,
                                  fontSize: 16,
                                  fontWeight: FontWeight.bold,
                                ),
                              ),
                    ),
                  ),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}
