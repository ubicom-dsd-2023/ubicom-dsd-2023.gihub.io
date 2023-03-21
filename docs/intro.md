---
sidebar_position: 1
---

# DSD UbiCom 2023

This project is a collaborative project between the DSD course at Jilin University in China, and Ubiquitous Computing at the University of Trás-os-Montes e Alto Douro, Portugal.

<div align="center">
    <img  src="https://raw.githubusercontent.com/ubicom-dsd-2023/.github/main/profile/MoPre.png"/>
</div>

## Motion Prediction

### About

Nowadays, the aged or disabled people are benefiting from the advances of high-techs such as computer aided __X__. With the application of deep neural networks, computers are smarter than ever to predict the intention of human beings. This means that more and more smart systems can be used to help take care of people with special needs.

O Motion Prediction (MoPre) is a software system to predict the user’s motion intention in the future time interval.
It is a 3-stage process.

1. Track the motion of users using 6-axis sensors, bind to legs, to form a labeled dataset of human motions. These data are collected using Bluetooth;
2. Train a common-sense deep neural network to predict human motions in general (via the dataset);
3. Provide a mechanism with an adjustable network structure to predict the personal intention of a real-world user, with a relatively small number of new-coming motions tracked at run-time.

### Requirements

The system described above should provide at least the following features:

- Data acquisition and upload based on an embedded system (such as Raspberry Pi) with a configuration GUI (to setup the operational parameters, for example: IP address of the server to upload data, sampling rate);
- A REST API to communicate with the remote data acquisition system and any other external module (example: dashboard, Mobile APP);
- A Database to laundry, manage and store the data collected from the sensors and the setup the parameters of the data acquisition system (Raspberry Pi);
- A prediction algorithm providing almost real-time responses;
- Dashboard where the historical and real-time data collected from the sensors and the predicted movement are displayed;
- An Android/IOS mobile APP.
