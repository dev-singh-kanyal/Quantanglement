import os
from install_dependencies import check_and_install_dependencies
from install_dependencies import check_cryptography
from keygen import generate_key
from client import send_message

def check_key():
    """Check if the shared key exists and is not empty."""
    key_path = os.path.join('key', 'shared_key.txt')  # Path to the shared key
    return os.path.isfile(key_path) and os.path.getsize(key_path) > 0

def main():
    """Main function to generate and send messages."""
    print("Running key.py")
    print("--------------------")
    print()
    
    # Check if the shared key exists
    if not check_key():
        print("Shared key not found. Generating...")
        print("--------------------")
        print()
        
        # Create the key directory if it doesn't exist
        if not os.path.exists('key'):
            os.makedirs('key')

        # Check and install dependencies for generating key
        check_and_install_dependencies()

        # Generate the shared key
        shared_key = generate_key()
        print()
        
        # Write the shared key to a file
        with open(os.path.join('key', 'shared_key.txt'), 'w') as file:
            file.write(shared_key)
        print("Shared key generated and saved.")
        print("--------------------")
        print()
    
    # Check and install cryptography package for sending message
    check_cryptography()
    print()
    
    # Send the message
    send_message()
    print()

    # Delete message.txt after sending the message
    message_file_path = os.path.join('..', 'client', 'message', 'message.txt')
    if os.path.exists(message_file_path):
        os.remove(message_file_path)
        print("message.txt deleted.")
    else:
        print("message.txt not found.")

    print("Exiting key.py")
    print()

# Run the main function if the script is run directly
if __name__ == "__main__":
    main()
