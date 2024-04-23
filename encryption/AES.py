function AESencrypt(plaintext, key) {
    blocks := divideIntoBlocks(plaintext);
    // The plaintext is divided into blocks of 128 bits each

    for each block in blocks {
        // Initial AddRoundKey
        add_round_key(block, key);
        // Each byte of the block is combined with a byte of the key using bitwise xor

        // Iterate through each round
        // The number of rounds depends on the key length as follows:
        // 128 bit key – 10 rounds, 192 bit key – 12 rounds, 256 bit key – 14 rounds
        for (int round = 1; round < number_of_rounds; round++) {
            sub_bytes(block);
            // Non-linear substitution step where each byte is replaced with another according to a lookup table
            shift_rows(block);
            // A transposition step where the last three rows of the state are shifted cyclically a certain number of steps
            mix_columns(block);
            // A mixing operation which operates on the columns of the state, combining the four bytes in each column
            add_round_key(block, key);
        }

        // Final round without MixColumns
        sub_bytes(block);
        shift_rows(block);
        add_round_key(block, key);
    }
}
