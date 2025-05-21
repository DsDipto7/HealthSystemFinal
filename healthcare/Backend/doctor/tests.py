from django.test import TestCase

# Create your tests here.
from django.test import TestCase
from django.urls import reverse
from doctor.models import Doctor

class DoctorLoginTest(TestCase):
    def setUp(self):
        self.doctor = Doctor.objects.create(
            name="Dr. Test",
            photo="doctors/test.jpg",
            license_number="123456",
            qualification="MBBS",
            email="testdoc@example.com",
            college_name="Test College",
            specialist="Cardiology",
            bio="Test bio",
            experience=5,
            consultation_fee=100.00,
            available_time="10:00 AM - 4:00 PM"
        )

    def test_doctor_login_success(self):
        url = reverse('doctor-login')
        data = {
            "email": "testdoc@example.com",
            "license_number": "123456"
        }
        response = self.client.post(url, data, content_type='application/json')
        self.assertEqual(response.status_code, 200)
        self.assertIn("doctor_id", response.json())

    def test_doctor_login_fail(self):
        url = reverse('doctor-login')
        data = {
            "email": "testdoc@example.com",
            "license_number": "WRONG"
        }
        response = self.client.post(url, data, content_type='application/json')
        self.assertEqual(response.status_code, 401)