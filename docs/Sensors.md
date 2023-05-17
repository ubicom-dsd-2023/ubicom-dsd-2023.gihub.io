---
sidebar_position: 2
---

# Sensors

## Description

TODO

## How to Use the Programs of the Embedded System

1. Check if your device supports Bluetooth
2. Install `conda`
3. Clone the repository

```bash
git clone https://github.com/atoposyz/atoposyz.github.io
```

3. Setting up `conda` environment

```bash
conda create -n PI_rates python=3.10.9
conda activate PI_rates
python -m pip install bleak
```

4. Configure the MAC address of the sensor

```bash
cd atoposyz.github.io/project/BasedOnSDS
nano config.json
```

5. Start the Bluetooth receiving server

```bash
cd atoposyz.github.io/project/BasedOnSDS
conda activate PI_rates
python ES.py
```

## How to Make Data-Collection Test Locally

TODO





