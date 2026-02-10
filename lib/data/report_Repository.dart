import 'package:salem_app/data/dummy_reports.dart';
import 'package:salem_app/data/models/report_model.dart';


class ReportRepository {
  final List<ReportModel> _reports = List.from(dummyReports);

  List<ReportModel> getAllReports() => _reports;

  void addReport(ReportModel report) {
    _reports.insert(0, report);
  }

  ReportModel? getReportById(int id) {
    try {
      return _reports.firstWhere((r) => r.id == id);
    } catch (e) {
      return null;
    }
  }
}