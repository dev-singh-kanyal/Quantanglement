import os
import time
from keygen import generate_key
from cryptography.hazmat.primitives.ciphers import Cipher, algorithms, modes
from cryptography.hazmat.backends import default_backend

def aes_decrypt(key, ciphertext):
    """Decrypt ciphertext using AES decryption."""
    backend = default_backend()
    cipher = Cipher(algorithms.AES(key), modes.ECB(), backend=backend)
    decryptor = cipher.decryptor()
    decrypted_data = decryptor.update(ciphertext) + decryptor.finalize()
    
    padding_length = decrypted_data[-1]
    decrypted_data = decrypted_data[:-padding_length]
    
    return decrypted_data.decode('utf-8')

def receive_message():
    """Receive and decrypt messages."""
    with open('../client/key/shared_key.txt', 'r') as file:
        shared_key = file.read().strip()
    
    key = bytes.fromhex(shared_key.zfill(32))[:16]
    
    try:
        with open('../client/message/message.txt', 'rb') as file:
            ciphertext = file.read()
    except FileNotFoundError:
        print("message.txt is deleted. Exiting...")
        exit()
    
    decrypted_message = aes_decrypt(key, ciphertext)
    
    print("Received Message:", decrypted_message)
    
    if not os.path.exists('chat'):
        os.makedirs('chat')
    
    # Save message to chat history
    with open('chat/chat.txt', 'a') as chat_file:
        chat_file.write(decrypted_message + '\n')

def wait_for_message_file():
    """Wait for message.txt to be created."""
    print("Waiting for message.txt to be created...")
    while not os.path.exists('../client/message/message.txt'):
        time.sleep(1)
    print("message.txt found, starting monitoring.")

    # Once message.txt is found, process its contents
    receive_message()

def monitor_message():
    """Monitor message.txt for modifications."""
    # Check if chat history file exists, if yes, display previous messages
    if os.path.exists('chat/chat.txt'):
        print("Chat History:")
        with open('chat/chat.txt', 'r') as chat_file:
            print(chat_file.read())
    
    wait_for_message_file()
    
    # Continuously monitor message.txt for modifications
    while True:
        message_modified_time = os.path.getmtime('../client/message/message.txt')
        time.sleep(1)  # Check every second
        
        # If message.txt has been modified
        try:
            if os.path.getmtime('../client/message/message.txt') > message_modified_time:
                receive_message()
        except FileNotFoundError:
            print("message.txt is deleted. Exiting...")
            exit()

if __name__ == "__main__":
    generate_key()
    monitor_message()
