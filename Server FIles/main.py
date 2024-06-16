from measure_distance import average_trilateration, create_distance_coordinates_list
from k_means import prepare_single_measure_data,k_means_algorithm

data_for_k_means=[]

raw_measurements = [
    [[1, 3.64005494464, -30], [2, 9.17877987534, -80], [3, 4.71699056603, -40],  # measure 1
     [4, 3.53553390593, -100], [5, 6.57647321898, -100], [6, 9.12414379545, -100]],
    [[1, 7.51664818919, -100], [2, 1.58113883008, -20], [3, 2.91547594742, -70],  # measure 2
     [4, 5.4083269132, -100], [5, 3, -80], [6, 6.0415229868, -100]],
    [[1, 9.34077084613, -100], [2, 3.5, -80], [3, 4.27200187266, -80],  # measure 3
     [4, 4.74341649025, -60], [5, 1.5, -30], [6, 2.69258240357, -40]],
    [[1, 5.83095189485, -100], [2, 5.65685424949, -100], [3, 2, -50],  # measure 4
     [4, 1.11803398875, -20], [5, 2.5495097568, -20], [6, 5.38516480713, -70]],
    [[1, 3.16227766017, -30], [2, 6, -80], [3, 2.82842712475, -40],  # measure 5
     [4, 5.22015325446, -100], [5, 5.7008771255, -100], [6, 9.21954445729, -100]]
]


id_measurements = []
measurements_xy_array = []
beacon_locations = {
    1: (1, 6),
    2: (10, 7),
    3: (6, 5),
    4: (5.5, 2),
    5: (8.5, 3.5),
    6: (11, 1)
}

for measurement in raw_measurements:
    id_measurements.append(create_distance_coordinates_list(measurement, beacon_locations))

for distances_and_points in id_measurements:
    measurements_xy_array.append(average_trilateration(distances_and_points))

print("The point you're standing at:", measurements_xy_array)


# preparing data for K-means
for measurements_xy in measurements_xy_array:
    data_for_k_means.append(prepare_single_measure_data(measurements_xy, raw_measurements[measurements_xy_array.index(measurements_xy)],beacon_locations))


# Sample data (replace with your own data)
from k_means import prepare_single_measure_data
k_means_algorithm(data_for_k_means)

# process for k-means data preparing:
'''
 1. making distance and point list by sending to create_distance_coordinates_list() the measure data
    this function return a list of [(x,y),distance],...].
 2. finding the location of each measurement on the grid by the average_trilateration() function.
 3. data_for_k_means is a list of all the x,y of the measurement combined with the corresponding rssi of the same measurement.
 4. finally we take the data_for_k_means through the k_means process and extracts the x,y from each cluster
'''

# Constraints
'''
 1. the data for k-means must contain the same dimension for each point
 2. must have a dictionary for points id and (x,y) coordinates
'''

# Tasks
'''
1. handle the case of no coordinates found
'''