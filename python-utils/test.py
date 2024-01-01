def find_char_differences(string1, string2):
    # Initialize a list to store the differences
    differences = []

    # Iterate over the characters of both strings
    for i in range(min(len(string1), len(string2))):
        if string1[i] != string2[i]:
            # If characters are different, add the index and characters to the list
            differences.append((i, string1[i], string2[i]))

    # Handle the case where one string is longer than the other
    if len(string1) != len(string2):
        longer, shorter = (
            (string1, string2) if len(string1) > len(string2) else (string2, string1)
        )
        for i in range(len(shorter), len(longer)):
            differences.append((i, longer[i], ""))

    return differences


# Example strings
string1 = "والضحىواللىلإذاسجىماودعكربكوماقلىوللآخرةخىرلكمنالأولىولسوفىعطىكربكفترضىألمىجدكىتىمافآوىووجدكضالافهدىووجدكعائلافأغنىفأماالىتىمفلاتقهروأماالسائلفلاتنهروأمابنعمةربكفحدث"
string2 = "والضحىواللىلإذاسجىماودعكربكوماقلىوللآخرةخىرلكمنالأولىولسوفىعطىكربكفترضىألمىجدكىتىمافآواووجدكضالافهدىووجدكعادافإذاإلىفأغنىفأماالىتىمفلاتقهروأماالسائلفلاتنهروأمابنعمتربكفحدث"

# Find differences
differences = find_char_differences(string1, string2)
print(differences)
