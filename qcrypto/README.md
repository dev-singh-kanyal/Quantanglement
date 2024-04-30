# Qcrypto

Qcrypto is a secure communication system that leverages quantum cryptography for key generation and AES encryption for message transmission. The system consists of a client and a server. The client sends encrypted messages, and the server receives and decrypts the messages.

## Getting Started

These instructions will guide you on how to run the Qcrypto system on your local machine.

### Prerequisites

- Python 3.7 or higher
- Pip (Python Package Installer)
- Cirq library for quantum computing
- Cryptography library for AES encryption

### Running the System

1. Execute `run.bat` (right click and run as administrator). This is the recommended method. Alternatively, you can use the command `cmd.exe /c run.bat` in the command prompt.
2. If prompted to wait for `server.json`, navigate to the server directory and execute `server.py` using the command `py server.py`.
3. Now you can send messages. The messages will be displayed on the server side and stored in the chat history.

## System Components

The Qcrypto system consists of several Python scripts:

- `run.bat`: A batch script that changes the directory to the location of the batch file and runs the `key.py` script using PowerShell.
- `key.py`: Checks for the existence of a shared key, generates one if not found, and sends a message. Also handles the deletion of the `message.txt` file after the message is sent.
- `install_dependencies.py`: Checks and installs the necessary dependencies for the project. This includes checking and installing Python, pip, cirq, numpy, and cryptography.
- `keygen.py`: Generates a shared key between a client and a server using quantum key distribution.
- `client.py`: Enables sending AES encrypted messages. Reads a shared key from a file, accepts user input for messages, encrypts the messages using AES encryption, and writes the ciphertext to a file.
- `server.py`: Measures the client's qubits in a randomly chosen basis, generates a shared key based on the measurement results, and writes the server's basis and measurement results to a JSON file.

## License

This project is licensed under the MIT License - see the `LICENSE.md` file for details
