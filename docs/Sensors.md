---
sidebar_position: 2
---

# Sensors

## Description

TODO

## How to Use the Programs of the Embedded System

1. Turn on the six sensors (WT-901 BLE)
2. Install `conda`
3. Clone the repository onto your computer

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

The Bluetooth receiving server will not work without the corresponding sensors, make sure that all the six sensors have been turned on before starting the receiving server.

## How to Make Data-Collection Test Locally

CLI testing feature in the project that was not included in the requirements analysis, it is only used when system failure occurs and for internal testing of the embedded system.

1. Run `ES.py` 
2. Use the same `conda` environment to start `TC.py`

```bash
cd atoposyz.github.io/project/BasedOnSDS
conda activate PI_rates
python TC.py
```

3. Input Command to CLI

- `a`: auto detect motion and then start to record.
- `s`: start  to record instantly.
- `e`: end recording.
- `exit`: quit the program `TC.py`.

