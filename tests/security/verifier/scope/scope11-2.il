// ==++==
//
//   
//    Copyright (c) 2006 Microsoft Corporation.  All rights reserved.
//   
//    The use and distribution terms for this software are contained in the file
//    named license.txt, which can be found in the root of this distribution.
//    By using this software in any fashion, you are agreeing to be bound by the
//    terms of this license.
//   
//    You must not remove this notice, or any other, from this software.
//   
//
// ==--==

.assembly extern mscorlib {}
//Try to access a public class which overwrite the parent protected function, should not get VE

.module 'scope11-2.exe'

.assembly 'scope11-2' // as "scope11-2.exe"
 { 
.custom instance void [mscorlib]System.Security.AllowPartiallyTrustedCallersAttribute::.ctor() = ( 01 00 00 00 )
 
  .hash algorithm 0x00008004
  .ver 0:0:0:0
}
 

.class public auto ansi A extends [mscorlib]System.Object
{

  .field family int32 i
  .method family instance void foo() il managed
  {
    // Code size       11 (0xb)
    .maxstack  8
    IL_0000:  ldstr      "This is foo function in A class."
    IL_0005:  call       void [mscorlib]System.Console::WriteLine(class ['mscorlib']System.String)
    IL_000a:  ret
  } // end of method 'A::foo'

  .method public specialname rtspecialname instance void .ctor() il managed
  {
    // Code size       7 (0x7)
    .maxstack  8
    IL_0000:  ldarg.0
    IL_0001:  call       instance void [mscorlib]System.Object::.ctor()
    IL_0006:  ret
  } // end of method 'A::.ctor'

} // end of class 'A'

.class public auto ansi B extends A
{

  .field public int32 j
  .method public instance void foo() il managed
  {
    // Code size       11 (0xb)
    .maxstack  8
    IL_0000:  ldstr      "This is foo function in B class."
    IL_0005:  call       void [mscorlib]System.Console::WriteLine(class ['mscorlib']System.String)
    IL_000a:  ret
  } // end of method 'B::bar'

  .method public specialname rtspecialname instance void .ctor() il managed
  {
    // Code size       7 (0x7)
    .maxstack  8
    IL_0000:  ldarg.0
    IL_0001:  call       instance void A::.ctor()
    IL_0006:  ret
  } // end of method 'B::.ctor'

} // end of class 'B'

.class public auto ansi TestClass extends A
{

  .method public static void  Main(class ['mscorlib']System.String[] args) il managed
  {
    .entrypoint
    // Code size       13 (0xd)
    .maxstack  1
    .locals init (class B V_0)
    IL_0000:  newobj     instance void B::.ctor()
    IL_0005:  stloc.0
    IL_0006:  ldloc.0
    IL_0007:  call       instance void B::foo()
    IL_000c:  ret
  } // end of method 'TestClass::Main'

  .method public specialname rtspecialname instance void .ctor() il managed
  {
    // Code size       7 (0x7)
    .maxstack  8
    IL_0000:  ldarg.0
    IL_0001:  call       instance void A::.ctor()
    IL_0006:  ret
  } // end of method 'TestClass::.ctor'

} // end of class 'TestClass'

//*********** DISASSEMBLY COMPLETE ***********************
