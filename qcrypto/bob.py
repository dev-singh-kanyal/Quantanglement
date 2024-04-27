import os
from cryptography.hazmat.primitives.ciphers import Cipher, algorithms, modes
from cryptography.hazmat.backends import default_backend

def aes_decrypt(key, ciphertext):
    backend = default_backend()
    cipher = Cipher(algorithms.AES(key), modes.ECB(), backend=backend)
    decryptor = cipher.decryptor()
    decrypted_data = decryptor.update(ciphertext) + decryptor.finalize()
    
    padding_length = decrypted_data[-1]
    decrypted_data = decrypted_data[:-padding_length]
    
    return decrypted_data.decode('utf-8')

def receive_message():
    with open('shared_key.txt', 'r') as file:
        shared_key = file.read().strip()
    
    key = bytes.fromhex(shared_key.zfill(32))[:16]
    
    with open('message.txt', 'rb') as file:
        ciphertext = file.read()
    
    decrypted_message = aes_decrypt(key, ciphertext)
    
    print("Received Message:", decrypted_message)

if __name__ == "__main__":
    receive_message()
