import 'dart:io';
import 'package:file_picker/file_picker.dart';
import 'package:flutter/material.dart';
import 'package:salem_app/core/Constants.dart';
import 'package:salem_app/citizen/data/report_model.dart';
import 'package:salem_app/citizen/view/modules/myReports_page_wigets/custom_appBar.dart';
import 'package:salem_app/auth/view/modules/customForm_textField.dart';
import 'package:salem_app/Views/widgets/employee_role_widgets/back_to_myTasks_button.dart';
import 'package:salem_app/Views/widgets/employee_role_widgets/common%20widgets/task_card.dart';
import 'package:salem_app/Views/widgets/employee_role_widgets/task_progress_page_widgets/progress_Tracker.dart';
import 'package:salem_app/Views/widgets/employee_role_widgets/task_progress_page_widgets/request_support_button.dart';
import 'package:salem_app/Views/widgets/employee_role_widgets/task_progress_page_widgets/submit_resolution_button.dart';

class TaskProgressPage extends StatefulWidget {
  const TaskProgressPage({super.key, required this.report});
  final ReportModel report;

  @override
  State<TaskProgressPage> createState() => _TaskProgressPageState();
}

class _TaskProgressPageState extends State<TaskProgressPage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Column(
        children: [
          Padding(
            padding: const EdgeInsets.only(top: 30),
            child: const CustomAppBar(title: 'Task #9201'),
          ),
          TaskCard(report: widget.report),
          const SizedBox(height: 16),
          Container(
            height: 100,
            margin: EdgeInsets.all(15),
            padding: EdgeInsets.all(20),
            decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(14),
              color: Colors.grey
            ),
            child: ProgressTracker()),
            Container(
              margin: EdgeInsets.symmetric(horizontal: 15),
              padding: EdgeInsets.all(15),
              decoration: BoxDecoration(
                border: Border.all(color: kPrimaryColor),
                borderRadius: BorderRadius.circular(18)
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text('What was done ?',style: TextStyle(fontSize: 18,color: kPrimaryColor),),
                  const SizedBox(height: 10,),
                  CustomFormTextfield(
                    type: 'text',
                    hintText: 'Briefly write down the actions taken..',),
                ],
              ),
            ),
            FileUploadWidget(),
            Column(
              crossAxisAlignment: CrossAxisAlignment.center,
              children: [
                Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 10),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      SubmitResolutionButton(),
                      RequestSupportButton(),
                  
                    ],
                  ),
                ),
              ],
            ),
            const SizedBox(height: 8,),
            BackToMytasksButton(),
        ],
      ),
    );
  }
}





class FileUploadWidget extends StatefulWidget {
  const FileUploadWidget({super.key});

  @override
  State<FileUploadWidget> createState() => _FileUploadWidgetState();
}

class _FileUploadWidgetState extends State<FileUploadWidget> {
  File? selectedFile;

  // فتح المتصفح لاختيار الملف
  Future<void> pickFile() async {
    FilePickerResult? result = await FilePicker.platform.pickFiles(
      type: FileType.custom, // لو عايز ملفات محددة
      allowedExtensions: ['jpg', 'png', 'pdf'], // مثال
    );

    if (result != null && result.files.single.path != null) {
      setState(() {
        selectedFile = File(result.files.single.path!);
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        GestureDetector(
          onTap: pickFile,
          child: Container(
            height: 150,
            width: double.infinity,
            decoration: BoxDecoration(
              color: Colors.grey.shade200,
              borderRadius: BorderRadius.circular(12),
              border: Border.all(color: Colors.grey.shade400),
            ),
            child: Center(
              child: selectedFile == null
                  ? Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: const [
                        Icon(Icons.cloud_upload, size: 40, color: Colors.blue),
                        SizedBox(height: 10),
                        Text("Browse your file",
                            style: TextStyle(color: Colors.black54)),
                      ],
                    )
                  : Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        const Icon(Icons.check_circle,
                            size: 40, color: Colors.green),
                        const SizedBox(height: 10),
                        Text(
                          selectedFile!.path.split('/').last,
                          style: const TextStyle(color: Colors.black87),
                        ),
                      ],
                    ),
            ),
          ),
        ),

        const SizedBox(height: 10),

        ElevatedButton(
          onPressed: selectedFile != null
              ? () {
                  // هنا هتعمل رفع الملف للباك اند
                  print("Upload file: ${selectedFile!.path}");
                }
              : null,
          child: const Text("Upload File"),
        ),
      ],
    );
  }
}
