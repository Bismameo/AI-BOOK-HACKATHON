# Module 1: The Robotic Nervous System (ROS 2)

This module focuses on ROS 2 (Robot Operating System 2), the essential middleware for controlling and coordinating robotic systems, particularly relevant for complex platforms like humanoids.

## Focus: Middleware for robot control.

ROS 2 provides a flexible framework for writing robot software. It enables different components of a robotic system to communicate and work together seamlessly.

### ROS 2 Nodes, Topics, and Services.

-   **Nodes:** Executable processes that perform computation (e.g., a node to control a motor, a node to process camera data).
-   **Topics:** A publish-subscribe communication mechanism. Nodes publish data (messages) to topics, and other nodes subscribe to those topics to receive the data. This is ideal for streaming data, like sensor readings or joint states.
-   **Services:** A request-response communication mechanism. A client node sends a request to a service-providing node, which performs an action and sends back a response. This is suitable for actions that require a direct result, like moving a robotic arm to a specific position.

### Bridging Python Agents to ROS controllers using rclpy.

`rclpy` is the Python client library for ROS 2. It allows developers to write ROS 2 nodes in Python, making it easy to integrate AI agents and high-level control logic with ROS-based hardware controllers.

### Understanding URDF (Unified Robot Description Format) for humanoids.

URDF is an XML format used in ROS to describe all elements of a robot. For humanoids, URDF defines:

-   **Links:** The rigid bodies of the robot (e.g., torso, head, limbs).
-   **Joints:** The connections between links, specifying their type (e.g., revolute, prismatic) and limits of motion.
-   **Sensors and Actuators:** Their positions and properties on the robot.
-   **Visual and Collision Properties:** How the robot looks and how it interacts physically with its environment.

A well-defined URDF is crucial for accurate simulation, motion planning, and visualization of humanoid robots.