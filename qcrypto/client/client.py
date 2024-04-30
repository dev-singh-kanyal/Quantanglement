import os
from cryptography.hazmat.primitives.ciphers import Cipher, algorithms, modes
from cryptography.hazmat.backends import default_backend

def aes_encrypt(key, plaintext):
    """Encrypt plaintext using AES encryption."""
    backend = default_backend()
    cipher = Cipher(algorithms.AES(key), modes.ECB(), backend=backend)
    encryptor = cipher.encryptor()
    
    padding_length = 16 - (len(plaintext) % 16)
    padded_plaintext = plaintext + bytes([padding_length]) * padding_length
    
    ciphertext = encryptor.update(padded_plaintext) + encryptor.finalize()
    return ciphertext

def send_message():
    """Send encrypted messages."""
    if not os.path.exists('message'):
        os.makedirs('message')
    
    with open('key/shared_key.txt', 'r') as file:
        shared_key = file.read().strip()
    
    key = bytes.fromhex(shared_key.zfill(32))[:16]
    
    while True:
        message = input("Enter the message (type 'exit' to quit): ")
        
        if message.lower() == 'exit':
            print("Exiting messaging...")
            return
        
        ciphertext = aes_encrypt(key, message.encode('utf-8'))
        
        with open('message/message.txt', 'wb') as file:
            file.write(ciphertext)
        
        print("Message sent. Waiting for next message...")
        print()

if __name__ == "__main__":
    send_message()
