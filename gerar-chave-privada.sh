#!/bin/bash

ARQUIVO="ifsc.key"

cat > ${ARQUIVO} << EOF
-----BEGIN OPENSSH PRIVATE KEY-----
${SSH_PRIVATE_KEY}
-----END OPENSSH PRIVATE KEY-----
EOF
chmod 0600 ${ARQUIVO}
