Pod::Spec.new do |s|
  s.name = 'InBetweenGoogleSigninConfig'
  s.version = '1.0.0'
  s.summary = 'Google Sign-In configuration for In-Between'
  s.license = 'MIT'
  s.homepage = 'https://in-between.live'
  s.author = 'Applied Method'
  s.source = { :git => '', :tag => s.version.to_s }
  s.ios.deployment_target = '14.0'

  # Add Google Sign-In dependency
  s.dependency 'CapacitorFirebaseAuthentication'
  s.dependency 'GoogleSignIn', '7.1.0'
end
