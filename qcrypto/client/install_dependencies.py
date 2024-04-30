import subprocess
import sys

def install(package):
    """Install a package using pip."""
    try:
        subprocess.check_call([sys.executable, "-m", "pip", "install", package])
        print(f"{package} is installed successfully.") 
    except Exception as e:
        print(f"Failed to install {package}. Error: {str(e)}") 

def check_python():
    """Check if Python is installed."""
    try:
        subprocess.check_call([sys.executable, "-V"])
        print("Python is installed.") 
    except Exception as e:
        print(f"Python is not installed. Error: {str(e)}")  

def check_pip():
    """Check if pip is installed."""
    try:
        subprocess.check_call([sys.executable, "-m", "pip", "--version"])
        print("pip is installed.") 
    except Exception as e:
        print(f"pip is not installed. Error: {str(e)}")

def check_cirq():
    """Check if cirq is installed."""
    try:
        import cirq
        print("cirq is imported.")
    except ImportError:
        print("cirq is not installed. Installing...")
        install("cirq")

def check_numpy():
    """Check if numpy is installed."""
    try:
        import numpy as np
        print("numpy is imported.") 
    except ImportError:
        print("numpy is not installed. Installing...") 
        install("numpy")

def check_cryptography():
    """Check if cryptography is installed."""
    try:
        from cryptography.hazmat.primitives.ciphers import Cipher, algorithms, modes
        from cryptography.hazmat.backends import default_backend
        print("cryptography is imported.")
    except ImportError:
        print("cryptography is not installed. Installing...") 
        install("cryptography")

def check_and_install_dependencies():
    """Check and install dependencies."""
    print("Running install_dependencies.py")
    check_python()
    check_pip()
    check_cirq()
    check_numpy()
    check_cryptography()

if __name__ == "__main__":
    check_and_install_dependencies()
