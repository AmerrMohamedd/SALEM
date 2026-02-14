
class ReportModel {
  final String id;
  final String type;
  final String status;
  final DateTime createdAt;
  final String? description;
  final String? imageUrl;
  final String location;


  ReportModel({
    required this.id,
    required this.type,
    required this.status,
    required this.createdAt,
     this.description,
     this.imageUrl,
    required this.location,
  });

  factory ReportModel.fromJson(Map<String, dynamic> json) {
    return ReportModel(
      id: json['id'].toString(),
      type: json['type'],
      status: json['status'],
      createdAt: DateTime.parse(json['created_at']),
      description: json['description'],
      imageUrl: json['image_url'],
      location:  json['location'] 
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'type': type,
      'status': status,
      'created_at': createdAt.toIso8601String(),
      'description': description,
      'image_url': imageUrl,
      'location': location,

    };
  }
}
