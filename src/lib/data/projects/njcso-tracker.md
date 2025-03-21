<script lang="ts">
	import Media from '$lib/components/media.svelte';
</script>

During my time as an executive member of the National Junior College Strings Orchestra (NJCSO), I faced a significant operational challenge: managing our growing collection of over 30 instruments. Keeping track of which instruments were in storage versus which were checked out to students had become a logistical headache that consumed valuable time and created unnecessary confusion.

I developed a streamlined web application that transformed our inventory management process. The solution combines simplicity with modern technology to provide real-time visibility into our instrument collection's status.

<Media
	src="/projects/njcso-tracker-1.png"
	alt="Logs generated and saved to Google Sheet"
	caption="Logs generated and saved to Google Sheet"
/>

The system's elegant QR code verification process ensures accountability and accuracy. When checking instruments in or out, orchestra members scan both the instrument's unique QR code and the storage zone's code using their smartphone cameras. This dual verification confirms physical presence and prevents unauthorized access or misplaced instruments.

For the backend, I deliberately chose Google Sheets instead of a traditional database. This decision made the system immediately accessible to our less tech-savvy users while still providing robust data management. Orchestra administrators can view inventory status and borrowing history through a familiar interface, while the web application handles all the technical aspects of updating records and retrieving data.

<Media
	src="/projects/njcso-tracker-2.png"
	alt="Loan status and whereabouts of instruments"
	caption="Loan status and whereabouts of instruments"
/>

The borrowing process unfolds seamlessly:

1. A student scans the desired instrument's QR code
2. The system instantly verifies availability
3. After confirmation, they scan the storage zone's QR code
4. The system cross-references location data
5. Transaction details are automatically logged and inventory status updates in real-time

This project dramatically improved our orchestra's operational efficiency while providing a practical education in developing user-centered solutions with the right balance of technology and accessibility.