import unittest
import measure_distance
class TestTrilateration(unittest.TestCase):
    def test_average_trilateration(self):
        distances_and_points_list = [
            # actual distance:(5,3,5,2.236,3.605)
            [[5.5, (0, 0)], [3, (3.5, 0)], [5.5, (8, 0)], [2, (6, 4)], [4, (2, 6)]],
            # actual distance:(7.211,3,3,6.3245,4.1231)
            [[7, (1, 2)], [3.5, (5, 5)], [3.5, (2, 8)], [6.5, (7, 2)], [4.5, (9, 7)]],
            # actual distance:(14.1421,10,7.071,10.6301,4.4721)
            [[14.5, (0, 0)], [10.5, (10, 0)], [7.5, (5, 5)], [10, (2, 3)], [4, (8, 6)]],
            # Add more test cases as needed
        ]

        expected_average_result = [(4, 3), (5, 8), (10, 10)]  # Expected average coordinates for the given test cases
        actual_average_result = []
        # Call the function to get the actual result
        for i in range(len(distances_and_points_list)):
            actual_average_result.append(measure_distance.average_trilateration(distances_and_points_list[i]))

        # Assert that the actual result matches the expected result for each test case
        for i in range(len(actual_average_result)):
            actual_x, actual_y = actual_average_result[i]
            expected_x, expected_y = expected_average_result[i]
            self.assertAlmostEqual(actual_x, expected_x, delta=1)
            self.assertAlmostEqual(actual_y, expected_y, delta=1)
        print(actual_average_result)

if __name__ == '__main__':
    unittest.main()
